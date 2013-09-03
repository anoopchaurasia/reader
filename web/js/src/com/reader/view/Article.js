fm.Package("com.reader.view");
fm.Import("com.reader.article.ArticleController");
fm.Class("Article", "com.reader.view.View");
com.reader.view.Article = function(base, me, ArticleController){
	this.setMe=function(_me){me=_me};
	this.Article = function(){
        this.url = '/html/article.view.html';
		this.items = [
            {
                controller: ArticleController,
                template: '/html/article.html',
                container : '#articleContContainer'
            }
        ];
	};
};