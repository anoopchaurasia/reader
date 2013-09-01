fm.Package("com.reader.controller");
fm.Import("com.reader.article.Articles");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.setting.Settings");
fm.Class("ArticleListController", 'com.reader.controller.MainController');
com.reader.controller.ArticleListController = function ( me, Articles, Settings, Sources, ArticleController) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.onStart = function(pathInfo, cb){
        Sources.getInstance().getArticles(parseInt(pathInfo.id), function(articles){
            me.articles = articles;
            cb();
        });
    };

    var windowResize;

    this.onStop = function(){
        windowResize();
    };
    
    this.showArticle = function (articleId) {
        location.hash = location.hash + "/article/" + articleId;  
    };

    function setValues (){
        me.article_height = 130;
        me.width = me.settings.window_width - me.settings.sourceListwidth;
        me.artcle_width = me.width < 300 ? me.width: 300;
    }

    this.ArticleListController = function  (lastState) {
        me.settings = Settings.getInstance();
        setValues();
        windowResize = me.settings.on('window-resize', function(){
            setValues();
            me.callAll("change");
        });
    };


    this.move = function(elem){
        var current;elem = $(elem);
        $(document).off('keydown').on('keydown', function(e){
            var elemets = elem.find(".newsSnippet");
            current = current || elemets.eq(0);
            current.removeClass('selected');
            switch(e.keyCode){
                case 37:{
                    var top = current.offset().top, i=0, index = elemets.index(current);
                    while(i < elemets.length){
                        i++;
                        index--;
                        current = elemets.eq( (index + elemets.length)%elemets.length );
                        if( top === current.offset().top ){
                            break;
                        }
                    }
                    break;
                }
                case 38:{
                    var left = current.offset().left, i=0, index = elemets.index(current);
                    while(i < elemets.length){
                        i++;
                        index--;
                        current = elemets.eq( (index + elemets.length)%elemets.length );
                        if(left === current.offset().left){
                            break;
                        }
                    }
                    break;
                }
                case 39:{
                    var top = current.offset().top, i=0, index = elemets.index(current);
                    while(i < elemets.length){
                        i++;
                        index++;
                        current = elemets.eq( (index + elemets.length)%elemets.length );
                        if( top === current.offset().top ){
                            break;
                        }
                    }
                    break;
                }
                case 13:{
                    current.click();
                    break;
                }
                case 40:{
                    var left = current.offset().left, i=0, index = elemets.index(current);
                    while(i < elemets.length){
                        i++;
                        index++;
                        current = elemets.eq( (index + elemets.length)%elemets.length );
                        if(left === current.offset().left){
                            break;
                        }
                    }
                    break;
                }
            }
            current.addClass('selected');
        });
    };
};
