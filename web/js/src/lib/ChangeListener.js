fm.Package('lib');
fm.AbstractClass("ChangeListener");
lib.ChangeListener = function (me) {
	this.setMe = function (_me) { me = _me; };
	var cbList = {};
	this.onChange = function(name, cb){
		cbList[name] = cbList[name] || [];
		cbList[name].push(cb);
	};

	this.changed = function(name, old, new_val){
		var list = cbList[name];
		for(var i=0; list && i< list.length; i++){
			list[i]( new_val, old );
		};
	};

	this.remove = function(name, cb){
		if(!cb){
			cbList[name] = [];
		}else{
			var index = cbList[name].indexOf(cb);
			cbList[name].splice(index, 1);
		}
	};

	this.ChangeListener = function(){
		
	};
}