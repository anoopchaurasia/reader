fm.Package("com.reader.article");
fm.Class("Article");
com.reader.article.Article = function (me) {	this.setMe=function(_me){me=_me};

	this.Article = function (article) {
		this.title = article.title;
		this.link = article.link;
		this.contentSnippet = article.contentSnippet;
		this.content = article.content;
	};
};
