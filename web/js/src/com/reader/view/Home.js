fm.Package("com.reader.view");
fm.Import("com.reader.source.SourceController");
fm.Import("com.reader.article.ArticleListController");
fm.Class("Home", "com.reader.view.View");
com.reader.view.Home = function(base, me, SourceController, ArticleListController){
	this.setMe=function(_me){me=_me};
	this.Home = function(){
		this.url = '/html/home.view.html';
		this.items = [
            {
                controller: ArticleListController,
                template: '/html/articles.html',
                container : '#dynamic'
            },
            {
                controller: SourceController,
                template: '/html/sources.html',
                container : '#sourceList'
            }
        ];
	};

	this.onChange = function(keyValue, oldKeyValue){
		this.reRender(ArticleListController, keyValue);
	};
};