fm.Package("com.reader");
fm.Import("com.reader.hash.RegisterHash");
fm.Import("com.reader.controller.ActionController");
fm.Import("jfm.html.LoopScope");
fm.Include("lib.parser");
fm.Import("com.reader.controller.SourceController");
fm.Class("Reader");
com.reader.Reader = function (me, RegisterHash, SourceController, ActionController) {
    this.setMe = function (_me) { me = _me };
    Static.main = function () {
		new RegisterHash();
	};
};