require("./../../config/web.js");
require('jsfm-starter');
fm.basedir = __dirname +"./../..";
fm.Package("com.reader");
fm.Class("Reader", 'com.reader.Base');
com.reader.Reader = function(){
	this.Reader = function(){
		console.log("Called");
	}

	this.method =  function () {
		console.log("Called");
	}
};