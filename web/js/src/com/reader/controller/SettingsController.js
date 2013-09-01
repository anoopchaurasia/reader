fm.Package("com.reader.controller");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Class("SettingsController", 'com.reader.controller.MainController');
com.reader.controller.SettingsController = function (base, me, Settings, SettingsController, DomManager) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

	this.SettingsController = function(settings){
		this.settings = Settings.getInstance();
		$('body').css(this.settings.color_class);
	};

	this.open = function(){
		this.getTemplate('/html/settings.html',function(tmpl){
			$("body").append( new DomManager(tmpl, me).el );
		})
	};

    this.applyFontSize = function(size){
    	this.settings.set('fontSize', size);
    };

	this.applyColors = function(cls){
    	this.settings.set('color_class', cls);
		$('body').css(this.settings.color_class);
    };

    this.close = function(){
    	$("#settingPopup").remove();
    };
};