fm.Package("com.reader.setting");
fm.Class("Settings", "lib.ChangeListener");
com.reader.setting.Settings = function(base, me){
	this.setMe = function (_me) { me = _me };
	
	this.Settings = function(){

		var settings = JSON.parse(localStorage.settings||"{}");
		this.fontSize = settings.fontSize || 14;
		this.fontColor = settings.fontColor || "#000";
		base();
		var t;
		var oldSize = $(window).resize(function(){
			clearTimeout(t);
			t = setTimeout(function() {
				var temp=$(window).width();
				me.callAll('window-resize', temp , oldSize);
				oldSize = temp;
			}, 500);
		}).width();
	};

	this.set = function(name, value){
		if(value < 10 || value > 30) return;
		var old=this[name];
		this[name] = value;
		localStorage.settings = JSON.stringify(this.serialize());
		this.callAll(name, value, old);
	};

	var instance;
	Static.getInstance = function () {
		if(!instance){
			instance = new me();
		}
		return instance;
	};
};