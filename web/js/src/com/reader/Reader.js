fm.Package("com.reader");
fm.Import("com.reader.hash.RegisterHash");
fm.Include("lib.parser");
fm.Class("Reader");
com.reader.Reader = function (me, RegisterHash){this.setMe=function(_me){me=_me;};
    'use strict';
    this.setMe = function (_me) { me = _me };
    Static.main = function () {
		new RegisterHash();
	};
};