fm.Package("jfm.hash");
fm.AbstractClass("HashChange");
jfm.hash.HashChange = function (me){this.setMe=function(_me){me=_me;};

	this.onUrlChange = function(a){
		var controller = fm.isExist(a.controller);
		new controller();
	};

	function onHashChange(){
		var hash = location.hash.substring(1);
		var hashArr = hash.split("/"), s;
		for(var k=0; k < me.route.length; k++){
			s = me.route[k].path.split("/");
			if(s.length == hashArr.length){
				for(var i= 0; i < s.length; i++){
					if(s[i] == hashArr[i] || s[i].indexOf(":") == 0){
						continue;
					}
					else {
						break;
					}
				}
				if(i == s.length){
					me.onUrlChange(me.route[k]);
					break;
				}
			}
		}
	}

	this.HashChange = function(  ) {
		this.route = [];
		window.onhashchange = onHashChange	
	};
};