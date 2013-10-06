fm.Package("com.reader.setting");
fm.Import("com.reader.setting.Settings");
fm.Class("SettingsController", 'jfm.dom.Controller');
com.reader.setting.SettingsController = function (base, me, Settings, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

	this.SettingsController = function(settings){
		this.settings = Settings.getInstance();
		$('body').css(this.settings.color_class);
		$(document).on('page_info', function(e, data){
			$("#taskbar").css("visibility", "visible");
			me.colNumber.text(data.colNumber);
			me.totalCol.text(data.totalCol);
		});
	};

	this.onStart = function(keyvalue, cb){
		cb();
	};

	this.onStop = function(){};

	this.open = function(){
		this.createDom('/html/settings.html',function(dom){
			$("body").append( dom.el );
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