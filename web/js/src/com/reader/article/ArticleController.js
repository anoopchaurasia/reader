fm.Package("com.reader.article");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.setting.Settings");
fm.Import("lib.FillContent")
fm.Class("ArticleController", 'com.reader.controller.MainController');
com.reader.article.ArticleController = function ( me, Articles, Sources, FillContent, Settings) {
 'use strict';   
 this.setMe = function (_me) { me = _me; };
    var fontChange;
    this.onStart = function(pathInfo, cb){
        Sources.getInstance().getArticles( parseInt(pathInfo.sourceId), function(articles){
            me.article =articles.getById(parseInt(pathInfo.articleId) );
    	    cb();
            create(me.article.content);
            fontChange = Settings.getInstance().on('fontSize,color_class,window-resize', function(){
                create(me.article.content);
            });
        });
    };

    this.onStop = function(){
        fontChange && fontChange();
        clearTimeout(setTimeOut);
    };

    this.ArticleController = function  (lastState) {
        
    };
    function getWidth(fs){
        var w = jQuery(window).width(), cw = fs*multi;
        return Math.min(w-40, cw);
    }
    var multi = 18;
    var setTimeOut;
    function create(data){
        data = "<h1 class='title'>"+ me.article.title +"</h1>" + data;
        var articleContainer = $("#articleContainer").empty();
        var articalWidth = getWidth(Settings.getInstance().fontSize), margins= 0;
        articleContainer.parent().css('fontSize', Settings.getInstance().fontSize);
        var trancatedLength = [ 0, 1 ];
        var htm = "<div class='parent selector'><div class='s'></div></div>";
        clearTimeout(setTimeOut);
        var bodyHeight = window.innerHeight - articleContainer.offset().top - 10;
        var content = new FillContent();
        var i = 0;
        function recursive( ) {
            var removeHeight = margins + 30;
            if (trancatedLength[1] <= 0) {
                articleContainer.append('<br style="clear:both" />');
                return;
            }
            i++;
            var elem;
            articleContainer.width((i) * (articalWidth + 40));
            elem = $(htm).appendTo(articleContainer);
            elem.find("div.s").height(bodyHeight - removeHeight -10).width(articalWidth);
            trancatedLength = content.truncateWithHeight(elem.find("div.s"), trancatedLength[0], data);
            setTimeOut = setTimeout(recursive, 10);
        }
        recursive();
    }

    this.move = function(elem){
        var current;elem = $(elem);
        $(document).off('keydown').on('keydown', function(e){
            var elemets = elem.find(".selector");
            current = current && current.filter(":visible").length && current || elemets.eq(0);
            current.removeClass('selected');
            switch(e.keyCode){
                case 37:{
                    if(current.prev().length){
                        current = current.prev();
                    }
                    break;
                }
                case 39:{
                     if(current.next().length && current.next()[0].nodeName !== "BR"){
                        current = current.next();
                    }
                    break;
                }
            }
            current.addClass('selected');
            scrollIntoView(current, elem);
        });
    };
    function scrollIntoView( element, elem ) {
        elem = elem.parent();
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
};
