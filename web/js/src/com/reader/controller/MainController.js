fm.Package("com.reader.controller");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.AbstractClass("MainController", 'lib.ChangeListener');
com.reader.controller.MainController = function(base, me, DomManager, Settings){
	this.setMe = function (_me) { me = _me; };
	var controllerContentMap = {};
	this.MainController=function(){
		//me.setTemplate();
	};
	Static.setTemplate =function(content, controller){
		var content = process(content, controller);
		controllerContentMap[controller.toString()] = content;
	};
	Static.getTemplate = function(controller){
		var cls= controller.toString();
		return controllerContentMap[cls]&&controllerContentMap[cls].clone(true);
	};

	function process(content, scope){
		if(typeof content === 'string'){
			content = jQuery(content);
		}
  		return content;
	}
};