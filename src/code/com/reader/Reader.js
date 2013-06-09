fm.Package("com.reader");
fm.Class("Reader", 'com.reader.Base');
com.reader.Reader = function(){
	this.Reader = function(){
		console.log("Called");
	}

	this.method = function( req, res ) {
		var path = process.cwd() + "/../web/index.html";
		require('fs').readFile(path, function( err, data ) {
			if (err) {
				console.log(err);
			}
			else {
				res.write(data);
				res.end();
			}
		});
	};
};