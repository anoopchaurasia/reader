fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import( "jfm.html.DomManager");
fm.Class("SourceController", 'com.reader.controller.MainController');
com.reader.controller.SourceController = function (base, me, Sources, DomManager) {
    this.setMe = function (_me) { me = _me; };
    var onChangeListeners = [];

    this.SourceController = function () {
    	me.showText = window.innerWidth * 15/100 > 120;
        me.sources = Sources.getInstance();
    };

};
