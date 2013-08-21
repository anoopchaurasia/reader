fm.Package("com.reader.article");
fm.Import('lib.Utility');
fm.Class("Article");
com.reader.article.Article = function (me, Utility) {	this.setMe=function(_me){me=_me};

	this.Article = function (article, index) {
		this.title = article.title;
		this.link = article.link;
		this.id = index + 1;
		try{
			me.img = [];
			for(var i=0; i <article.mediaGroups[0].contents.length; i++){
				me.img.push(article.mediaGroups[0].contents[i]);
			}
			me.thumbnail = article.mediaGroups[0].contents[0].thumbnails[0].url;
		}catch(e){};
		this.contentSnippet = article.contentSnippet;
		this.content = Utility.stripHTML(article.content);
	};
};
