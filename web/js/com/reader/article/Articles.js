fm.Package("com.reader.article");
fm.Import("com.reader.article.Article");
fm.Import("jfm.html.LoopScope");
fm.Class("Articles", "jfm.html.DomManager");
com.reader.article.Articles = function (base, me, Article) {	this.setMe=function(_me){me=_me};

	this.Articles = function (feed) {
		this.title = feed.title;
		this.items  = createList(feed.entries);
		base();
	};

	this.showArticle = function(k){
		
	};

	function createList(list){
		var arr = [];
		for(var i=0; i < list.length; i++){
			arr.push( new Article(list[i]) );
		}
		return arr;
	}
};
