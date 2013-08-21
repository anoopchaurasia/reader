fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Class("ActionController", 'lib.ChangeListener');
com.reader.controller.ActionController = function (base, me, Sources, DomManager, Settings) {
    this.setMe = function (_me) { me = _me; };

    this.ActionController = function () {
    	base();
    	this.settings = Settings.getInstance();
        new DomManager( jQuery("#taskbar"), me);
    };

    this.increaseFont = function(){
    	this.settings.set('fontSize', this. settings.fontSize + 2);
    	this.changed('settings.fontSize');
    };
};