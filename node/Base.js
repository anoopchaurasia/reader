/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
fm.Package("");
fm.AbstractClass("Base");
Base = function (me){this.setMe=function(_me){me=_me;};

    this.Abstract.method = function(){};
    this.POST = function(req, resp, t){
       var method = req.params.method || 'method';
       var cls = this.getSub();
       cls[method](req, resp, t);
    };

    this.GET = function(req, resp){
    	 console.log("GET");
        this.POST(req, resp);
    };
};
