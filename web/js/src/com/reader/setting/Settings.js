fm.Package("com.reader.setting");
fm.Class("Settings");
com.reader.setting.Settings = function(me){
	this.setMe = function (_me) { me = _me };
	
	this.Settings = function(){
		this.fontSize = 12;
		this.fontColor = '#000';
	};

	this.set = function(name, value){
		this[name] = value;
	};

	var instance;
	Static.getInstance = function () {
		if(!instance){
			instance = new me();
		}
		return instance;
	};
};