fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import( "jfm.html.DomManager");
fm.Class("SourceController", 'lib.ChangeListener');
com.reader.controller.SourceController = function (base, me, Sources, DomManager) {
    this.setMe = function (_me) { me = _me; };
    var onChangeListeners = [];

    this.SourceController = function () {
        this.sources = new Sources.getInstance();
        new DomManager( jQuery("[fm-controller='com.reader.controller.SourceController']"), me);
    };
};
