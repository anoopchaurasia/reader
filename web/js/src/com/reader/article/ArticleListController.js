fm.Package("com.reader.article");
fm.Import("com.reader.article.Articles");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.setting.Settings");
fm.Class("ArticleListController", 'com.reader.controller.MainController');
com.reader.article.ArticleListController = function ( me, Articles, Settings, Sources, ArticleController) {
    'use strict';
    this.setMe = function (_me) { me = _me; };
    this.onStart = function(pathInfo, cb){
        Sources.getInstance().getArticles(parseInt(pathInfo.id), function(articles){
            me.articles = articles;
            cb();
            me.articleMove.height(window.innerHeight-me.articleMove.offset().top);
            move(me.articleMove);
        });
    };

    this.onChange = function(pathInfo, cb){
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
        me.verticleAlign = me.width <= 500;
    }

    this.ArticleListController = function  (lastState) {
        me.settings = Settings.getInstance();
        setValues();
        windowResize = me.settings.on('window-resize', function(){
            setValues();
            me.callAll("change");
        });
    };


    function move(elem){
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
                    scrollIntoViewLeft(current, elem);
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
                    scrollIntoViewTop( current, elem )
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
                    scrollIntoViewLeft(current, elem);
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
                    scrollIntoViewTop( current, elem );
                    break;
                }
            }
            current.addClass('selected');
        });
    };

    function scrollIntoViewLeft( element, elem ) {
        elem = elem.parent().parent();
        var containerLeft = elem.scrollLeft();
        var containerRight = containerLeft + elem.width();
        var elemLeft = element[0].offsetLeft - elem[0].offsetLeft;
        var elemRight = elemLeft + element.width() + 10;
        if (elemLeft < containerLeft) {
            elem.scrollLeft(elemLeft);
        }
        else if (elemRight > containerRight) {
            elem.scrollLeft(elemRight - elem.width());
        }
    }
    function scrollIntoViewTop( element, elem ) {
        var containerTop = elem.scrollTop();
        var containerBottom = containerTop + elem.height();
        var elemTop = element[0].offsetTop - elem[0].offsetTop;
        var elemBottom = elemTop + element.height() + 10;
        if (elemTop < containerTop) {
            elem.scrollTop(elemTop);
        }
        else if (elemBottom > containerBottom) {
            elem.scrollTop(elemBottom - elem.height());
        }
    }
};
