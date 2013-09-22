fm.Package("com.reader.controller");
fm.Class("EditNewsFeed", 'jfm.dom.Controller');
com.reader.controller.EditNewsFeed = function (base, me) {
    'use strict';
    this.setMe = function (_me) { me = _me; };

    this.EditNewsFeed = function () {
        this.FeedList = [];
        try{
            this.FeedList = JSON.parse(localStorage.selecteFeedSource || undefined) || [];
        }catch(e){
            this.FeedList = [{
                id: 1,
                url : "http://feeds.mashable.com/Mashable",
                name : "Mashable",
                thumbnail: "mashable.jpg"
            }, {
                id: 2,
                url : "http://feeds.feedburner.com/fakingnews",
                name : "Faking News",
                thumbnail:"fakingnews.jpg"
            }, {
                id: 3,
                url : "http://www.theverge.com/rss/index.xml",
                name : "The Verge",
                thumbnail: "verge.jpg"
            }, {
                id: 4,
                url : "http://www.engadget.com/editor/brian-heater/rss.xml",
                name : "Engadget",
                thumbnail: 'engadget.jpg'
            }, {
                id: 5,
                url : "http://feeds.feedburner.com/liveside",
                name : "live side",
                thumbnail: 'liveside.jpg'
            }, {
                id: 6,
                url : "http://feeds.slashgear.com/slashgear",
                name : "Slashgear",
                thumbnail: 'slashgear.jpg'
            }, {
                id: 7,
                url : "http://feeds.feedburner.com/TechCrunch/",
                selected : true,
                name : "Tech Crunch",
                thumbnail: 'techcrunch.jpg'
            }];
        }
    };

    this.domchange = function(){
        
        localStorage.selecteFeedSource = JSON.stringify(this.FeedList);
    };

    this.onStart = function(keys, cb){
        cb();
    }
    this.onStop = function(keys, cb){
    }
};