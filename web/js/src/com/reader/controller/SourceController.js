fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import( "jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Class("SourceController", 'com.reader.controller.MainController');
com.reader.controller.SourceController = function (base, me, Sources, DomManager, Settings) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    var windowResize;
    this.SourceController = function () {
    	base();
        me.settings = Settings.getInstance();
        me.sources = Sources.getInstance();
        setValues();
        windowResize = me.settings.on('window-resize', function(){
            setValues();
            me.callAll("change");
        });
    };

    function setValues(){
        me.hideText = window.innerWidth * 15/100 < 150;
    }

    this.onStart = function(keyValue, cb){
        cb();
    };
    this.onStop = function(){
        windowResize();
    };
};
