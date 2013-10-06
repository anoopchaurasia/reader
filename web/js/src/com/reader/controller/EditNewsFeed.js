fm.Package("com.reader.controller");
fm.Class("EditNewsFeed", 'jfm.dom.Controller');
com.reader.controller.EditNewsFeed = function (base, me, Controller) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

    this.EditNewsFeed = function () {
        this.FeedList = [];
         this.FeedList = com.reader.source.Sources.getData();
    };

    this.domchange = function(){

        localStorage.selecteFeedSource = JSON.stringify(this.FeedList);
        com.reader.source.Sources.getInstance().resetItems();
    };

    this.onStart = function(keys, cb){
        cb();
    }
    this.onStop = function(keys, cb){
    }
};