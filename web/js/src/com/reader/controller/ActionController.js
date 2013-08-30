fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Class("ActionController", 'com.reader.controller.MainController');
com.reader.controller.ActionController = function (base, me, Sources, DomManager, Settings) {
    this.setMe = function (_me) { me = _me; };

    this.ActionController = function () {
    	this.settings = Settings.getInstance();
    };

    this.increaseFont = function(){
    	this.settings.set('fontSize', this. settings.fontSize + 6);
    };
    this.decreaseFont = function(){
        this.settings.set('fontSize', this. settings.fontSize - 6);
    };
};