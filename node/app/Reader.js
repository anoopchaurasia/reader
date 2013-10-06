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
		var path =  "C:\\Users\\anoop\\Documents\\Visual Studio 2012\\Projects\\wpreader\\HTML5App1\\Html\\index.html";
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

	this.getFeed = function(req,resp){

		var options = {
				host: 'cloud.feedly.com'
			  , port: 80
			  , path: '/v3/search/feeds?n=15&q=' + req.params.query_data
		};
		console.log("fghj");
		var request = require("http").get(options, function(res){
			var imagedata = ''
			resp.setHeader("Content-Type",'application/json');
			res.on('data', function(chunk){
				imagedata += chunk;
			});

			res.on('end', function(){
				resp.write(imagedata);
				resp.end("\n");
			})
		});
		console.log("fghj");
		request.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		  resp.end();
		});
		request.end();
		console.log("fghj");
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