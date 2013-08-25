fm.Package("com.reader.setting");
fm.Class("Settings", "lib.ChangeListener");
com.reader.setting.Settings = function(base, me){
	this.setMe = function (_me) { me = _me };
	
	this.Settings = function(){
		var settings = JSON.parse(localStorage.settings||"{}");
		this.fontSize = settings.fontSize || 14;
		this.fontColor = settings.fontColor || "#000";
		base();
	};

	this.set = function(name, value){
		if(value < 10 || value > 24) return;
		var old=this[name];
		this[name] = value;
		localStorage.settings = JSON.stringify(this.serialize());
		this.changed(name, value, old);
	};

	var instance;
	Static.getInstance = function () {
		if(!instance){
			instance = new me();
		}
		return instance;
	};
};