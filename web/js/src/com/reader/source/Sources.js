fm.Package("com.reader.source");
fm.Import("com.reader.source.Source");
fm.Class("Sources", "com.reader.abstract.ItemList");
com.reader.source.Sources = function (base, me, Source) {
    this.setMe = function (_me) { me = _me; };
    this.Sources = function () {
        var data = [{
            id: 1,
	        url : "http://feeds.mashable.com/Mashable",
	        name : "Mashable"
        }, {
            id: 2,
	        url : "http://feeds.feedburner.com/fakingnews",
	        name : "Faking News",
        }, {
            id: 3,
	            url : "http://blogs.forbes.com/ewanspence/feed/",
	            name : "Ewan Spence"
        }, {
            id: 4,
	            url : "http://www.engadget.com/editor/brian-heater/rss.xml",
	            name : "Engadget"
        }, {
            id: 5,
	            url : "http://feeds.feedburner.com/liveside",
	            name : "liveside"
        }, {
            id: 6,
	            url : "http://feeds.slashgear.com/slashgear",
	            name : "Slashgear"
        }, {
            id: 7,
	            url : "http://feeds.feedburner.com/TechCrunch/",
	            selected : true,
	            name : "Tech Crunch"
	    }];
	    base(data, Source);
    }

    this.getArticles = function(id, cb){
        this.getById(id).getArticles(cb);
    };

    var instance;
    Static.getInstance = function () {
        if (!instance) {
            instance = new com.reader.source.Sources();
        }
        return instance;
    }
}