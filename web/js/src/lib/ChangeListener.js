fm.Package('lib');
fm.Class("ChangeListener");
lib.ChangeListener = function (me) {

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
}