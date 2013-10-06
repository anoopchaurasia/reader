fm.Package("com.reader.view");
fm.Import("com.reader.source.SourceController");
fm.Import("com.reader.article.ArticleListController");
fm.Class("Home", "jfm.dom.View");
com.reader.view.Home = function (base, me, SourceController, ArticleListController, View){this.setMe=function(_me){me=_me;};
    this.setMe=function(_me){me=_me};
    this.Home = function(){
        this.url = '/html/home.view.html';
        this.items = [
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