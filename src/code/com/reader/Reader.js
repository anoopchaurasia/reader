fm.Package("com.reader");
fm.Class("Reader", 'com.reader.Base');
com.reader.Reader = function(){
	this.Reader = function(){
		console.log("Called");
	}

	this.method =  function (req, res) {
		res.end("<html><body>Anoop</body></html>");
		console.log("Called");
	}
};