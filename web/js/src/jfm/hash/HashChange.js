fm.Package("jfm.hash");
fm.AbstractClass("HashChange");
jfm.hash.HashChange = function (me){this.setMe=function(_me){me=_me;};

	Abstract.onUrlChange = function(){};

	function onHashChange(){
		var hash = location.hash.substring(1);
		var hashArr = hash.split("/"), s, keyValue = {};
		for(var k=0; k < me.route.length; k++){
			s = me.route[k].path.split("/");
			if(s.length == hashArr.length){
				for(var i= 0; i < s.length; i++){
					if(s[i] == hashArr[i]){
						continue;
					}else if(s[i].indexOf(":") == 0){
						keyValue[s[i].substring(1)] = hashArr[i];
						continue;
					}
					else {
						break;
					}
				}
				if(i == s.length){
					me.onUrlChange( me.route[k], keyValue );
					break;
				}
			}
		}
	}

	this.activateCurrent = function () {
		onHashChange();
	};

	this.HashChange = function(  ) {
		this.route = [];
		window.onhashchange = onHashChange	
	};
};