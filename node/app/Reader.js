fm.Package("app");
fm.Include("web");
fm.Import("app.Location");
fm.Class("Reader", "Base");
app.Reader = function (base, me, Base){this.setMe=function(_me){me=_me;};
	Static.main=function(){
		web = webPath;
		Starter.handle(require('http').createServer().listen(8080, "localhost"));
	}
	this.method = function( req, res ) {
		var path = __dirname + "/../../web/index.html";
		require('fs').readFile(path, function( err, data ) {
			if (err) {

				res.writeHead(400, {'Content-Type': 'text/html'});

				console.log(err);
			}
			else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			}
		});
	};

	this.getArticles = function(req, resp){
		var http = require('http');
		var local_req =http.request(req.params.url, function(res){
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end',function(){
				resp.write(data);
				resp.end();
			});
		});
		local_req.on('error', function (argument) {
			console.log(argument);
		});
		local_req.end();
	};
};