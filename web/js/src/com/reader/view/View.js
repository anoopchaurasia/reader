fm.Package("com.reader.view");
fm.Import("jfm.html.DomManager");
fm.AbstractClass("View");
com.reader.view.View = function(me, DomManager){
    'use strict';
	this.setMe=function(_me){me=_me};
    var controllerInstances;
	this.View = function(){
        if(this.getSub().items){
		  this.items = this.getSub().items;
        }else{
            this.items = [];
        }
        controllerInstances = [];
	};

    this.getTemplate = function(cb){
        jQuery.get(this.getSub().url, cb);
    };

    this.onChange = function(){

    };

    this.controller = function(c){
        for (var i = 0; i < controllerInstances.length; i++) {
            if(controllerInstances[i].instanceOf(c)){
                return controllerInstances[i];
            }
        };
    };

    this.onStart = function(keyValue){
        this.getTemplate(function(html){
            $('#view').html(html);
            var items = me.getSub().items, item;
            for (var i = 0; i < items.length; i++) {
                var instance = new items[i].controller(keyValue);
                instance.template = instance.template || items[i].template;
                instance.container = instance.container || items[i].container;
                controllerInstances.push(instance);      
                loadController(instance, keyValue);
            };
        });
    };
    function loadController(instance, keyValue){

        instance.getTemplate(instance.template, function(template){
            instance.onStart(keyValue, function(){
                $(instance.container).html(new DomManager(template, instance).el );
            });
        });
    }

    this.reRender = function(cls, keyValue){
        loadController( this.controller(cls), keyValue);
    };

    this.onStop = function(){
        while(controllerInstances.length){
            controllerInstances.pop().onStop(function(){});
        }
    };

};