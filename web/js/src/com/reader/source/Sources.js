fm.Package("com.reader.source");
fm.Include("com.reader.source.SourceList");
fm.Import("com.reader.source.Source");
fm.Class("Sources", "com.reader.abstract.ItemList");
com.reader.source.Sources = function (base, me, Source, ItemList) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.Sources = function () {
        base(this.getSelected (), Source);
    }

    this.getSelected = function(){
        var list = this.getData(), selected=[];
        for (var i = 0; i < list.length; i++) {
            if(list[i].inlist){
                selected.push(list[i]);
            }
        };
        return selected;
    };

    this.next = function(id){
        var item = this.getById(id);
        var index = this.items.indexOf(item);
        return this.items[index+1].id;
    }

    this.prev = function(id){
        var item = this.getById(id);
        var index = this.items.indexOf(item);
        return this.items[index-1].id;
    }

    this.getArticles = function(id, cb){
        return this.getById(id).getArticles(cb);
    };

    Static.getData = function(){
                var data = [];
        try{
            data = JSON.parse(localStorage.selecteFeedSource || undefined) || [];
        }catch(e){
            data = sourceList;
        }
        return data;
    }

    var instance;
    Static.getInstance = function () {
        if(!instance) instance = new com.reader.source.Sources();
        return instance;
    };

    this.resetItems = function(){
        this.base.constructor(this.getSelected(), Source);
    };
};

window.onerror = function(e){
    alert(e + "");
}