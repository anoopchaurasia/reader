fm.Package("com.reader.source");
fm.Import("com.reader.source.Sources");
 fm.Import("com.reader.setting.Settings");
fm.Class("SourceController", 'jfm.dom.Controller');
com.reader.source.SourceController = function (base, me, Sources, Settings, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    var windowResize, dontRender;
    this.SourceController = function (lastState) {
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

    this.reRender = function(){
        return false;
    };

    this.onStart = function(keyValue, cb){
        cb(dontRender);
    };
    this.onStop = function(cb){
        windowResize();
        cb(this.sources);
    };
};
