fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Import("com.reader.controller.SettingsController");
fm.Class("ActionController", 'com.reader.controller.MainController');
com.reader.controller.ActionController = function (base, me, Sources, DomManager, Settings, SettingsController) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

    this.ActionController = function () {
    	this.settings = Settings.getInstance();
    };

    this.settingLoad = function(){
        this.getTemplate("/html/settings.html", function(template){
            var dom = new DomManager(template, new SettingsController(me.settings));
            $('body').append( dom.el );
        });
    };
};