fm.Package("com.reader.controller");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.AbstractClass("MainController", 'lib.ChangeListener');
com.reader.controller.MainController = function(base, me, DomManager, Settings){
	'use strict';
    this.setMe = function (_me) { me = _me; };
	var controllerContentMap = {};
	
	this.MainController=function(){
        base();
		//me.setTemplate();
	};
	
	Static.setTemplate =function(content, url){
		var content = process(content);
		controllerContentMap[url] = content;
	};
	
	Static.getTemplate = function(url, fn){
        if(controllerContentMap[url]){
            fn( $(controllerContentMap[url]).clone(true) );
        }else{
            jQuery.get(url, function(html){
                me.setTemplate(html, url);
                fn( $(controllerContentMap[url]).clone(true) );
            });
        }
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
                var old;
                scope.on('change', function(txt){
                    var n = parsefn(scope);
                    !isHasSameValue(n, old) && $(node).css( old = n );
                });
                old = parsefn(scope);
         		$(node).css(old);
        	}
        },
        fmHide: function(v){
            var value = parser(v);
            return function(node, scope){
                scope.on('change', function(txt){
                   var n = value(scope);
                   n !== old && ( (old = n ) ? $(node).css('display','none') : $(node).css('display','') );
                })
                var old = value(scope);
                old ? $(node).css('display','none') : $(node).css('display','');
            }
        },
        fmShow: function(v){
            var value = parser(v);
            return function(node, scope){
                scope.on('change', function(txt){
                    var n = value(scope);
                    n !== old && ( (old = n ) ? $(node).css('display','none') : $(node).css('display','') );
                })
                var old = value(scope);
                old ? $(node).css('display',''): $(node).css('display','none');
            }
        },
        fmSrc: function(value){
            var temp = /(.*?){{(.*?)}}/g.exec(value);
            value = parser(temp[2]);
            return function(node, scope){
                scope.on('change', function(txt){
                    var n = value(scope);
                    old !== n && ( node.src = temp[1] + (old = n) );
                })
                var old = value(scope);
            	node.src = temp[1] + old;
            };
        },
        fmHref: function(value){
            var temp = /(.*?){{(.*?)}}/g.exec(value);
            value = parser(temp[2]);
            return function(node, scope){
                scope.on('change', function(txt){
                    var n = value(scope);
                    old !== n && (node.href = temp[1] + (old = n) );
                })
                var old = value(scope);
            	node.href = temp[1] + old;
        	}
        },
        fmBind: function(value){
            value = parser(value);
            return function(node, scope){
                scope.on('change', function(txt){
                    var n = value(scope);
                    old !== n && ( node.innerHTML = (old = n) );
                });
                var old = value(scope);
            	node.innerHTML = old;
        	}
        },
        fmRepeat: function(value, node){
	        var exp = value.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
	        value = parser(exp[2]);
	        var actionObj = $(node).data('actionObj');
        	return function(node, scope){
	            var list = value(scope);
                console.log(exp[2], scope.toString());
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

    function isHasSameValue(old, n){
        for(var k in old){
            if(typeof old[k] == 'object'){
                return isHasSameValue(old[k], n[k]);
            }
            else if(old[k] !== n[k]){
                return false;
            }
        }
        return true;
    }
};