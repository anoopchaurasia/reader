fm.Package("com.reader.controller");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.AbstractClass("MainController", 'lib.ChangeListener');
com.reader.controller.MainController = function(base, me, DomManager, Settings){
	this.setMe = function (_me) { me = _me; };
	var controllerContentMap = {};
	
	this.MainController=function(){
        base();
		//me.setTemplate();
	};
	
	Static.setTemplate =function(content, controller){
		var content = process(content, controller);
		controllerContentMap[controller.toString()] = content;
	};
	
	Static.getTemplate = function(controller){
		var cls= controller.toString();
		return $(controllerContentMap[cls]&&controllerContentMap[cls]).clone(true);
	};

	function process(content){
		if(typeof content === 'string'){
			content = jQuery("<div>"+content+"</div>").contents()[0];
		}
		attributeInfo([content]);
		return content;
	}

	function attributeInfo(cn){
        var str, attributes, attribute, newCN = [];
        newCN = cn;
        for(var i=0, len = newCN.length; i < len; i++){
            attributes = newCN[i].attributes;
            var attriCollection={};
            switch(newCN[i].nodeType){
                case 1:{
                    for (var j = 0; j < attributes.length; j++) {
                        attribute = attributes[j];
                        ret = true;
                        if(attribute.specified){
                            attriCollection[directiveNormalize(attribute.name)] = $.trim(attribute.value);
                            applyNode(directiveNormalize(attribute.name), attriCollection[directiveNormalize(attribute.name)], newCN[i]);
                        }
                    };
                    attributeInfo(newCN[i].childNodes);
                    break;
                }
            }
        }
    }

    var legalAttr = {
        fmClick:function(value){
            value = parser(value);
            return function(node, scope){
	            $(node).on("click", function(){
	                value(scope);
	            });
            }
        },
        fmStyle: function(value){
        	var parsefn = parser("{"+value+"}");
        	return function(node, scope){
         		$(node).css(parsefn(scope));
        	}
        },
        fmHide: function(v){
            value = parser(v);
            return function(node, scope){
                scope.on('change', function(txt){
                    v.indexOf(txt) !== -1 && value(scope) ? $(node).css('display','none') : $(node).css('display','');
                })
            	value(scope) ? $(node).css('display','none') : $(node).css('display','');
            }
        },
        fmSrc: function(value){
            var temp = /(.*?){{(.*?)}}/g.exec(value);
            value = parser(temp[2]);
            return function(node, scope){
            	node.src = temp[1] + value(scope);
            };
        },
        fmHref: function(value){
            var temp = /(.*?){{(.*?)}}/g.exec(value);
            value = parser(temp[2]);
            return function(node, scope){
            	node.href = temp[1] + value(scope);
        	}
        },
        fmBind: function(value){
            value = parser(value);
            return function(node, scope){
            	node.innerHTML = value(scope);
        	}
        },
        fmRepeat: function(value, node){
	        var exp = value.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
	        value = parser(exp[2]);
	        var actionObj = $(node).data('actionObj');
        	return function(node, scope){
	            var list = value(scope);
	            var savefmRepeat = actionObj.fmRepeat;
	            delete actionObj.fmRepeat;
	            var newScopeC = function(){};
	            newScopeC.prototype = scope;
	            var newScope, clone;
	            for(var k =list.length -1; k >= 0; k--){
	            	newScope = new newScopeC;
	                newScope[exp[1]] = list[k];
	                newScope.index = k;
	                clone = $(node).clone(true);
	                $(node).after(clone);
	                new jfm.html.DomManager( clone, newScope);
	            }
	            $(node).remove();
	            actionObj.fmRepeat = savefmRepeat;
	            return false;
        	}
        },
        fmDirective: function(value){
            value = parser(value.replace("(", "(element"));
            return function(node, scope){
                scope.element = node;
                value(scope);
            }
        }
    }

    function applyNode(name, value, node){
        if(legalAttr[name]){
        	var actionObj = $(node).data("actionObj");
        	if(!actionObj){
        		$(node).data("actionObj", actionObj = {});
        	}
        	actionObj[name] = legalAttr[name](value, node);
        }
    }
};