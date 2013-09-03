fm.Package("com.reader");
fm.Import("com.reader.hash.RegisterHash");
fm.Import("jfm.html.LoopScope");
fm.Include("lib.parser");
fm.Class("Reader");
com.reader.Reader = function (me, RegisterHash, SourceController, ActionController) {
    'use strict';
    this.setMe = function (_me) { me = _me };
    Static.main = function () {
		new RegisterHash();
	};
};