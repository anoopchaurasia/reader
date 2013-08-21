fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import("lib.FillContent")
fm.Class("ArticleController", 'lib.ChangeListener');
com.reader.controller.ArticleController = function ( me, Articles, Sources, FillContent) {
    
 this.setMe = function (_me) { me = _me; };

    this.onStart = function(pathInfo, cb){
        Sources.getInstance().getArticles( parseInt(pathInfo.sourceId), function(articles){
            me.article =articles.getById(parseInt(pathInfo.articleId) );
    	    cb();
            create(me.article.content);
        } );
    };

    this.onStop = function(){
        $(".left-panel")[0].scrollIntoView();
    };

    this.ArticleController = function  (lastState) {
        
    };

    var setTimeOut;
    function create(data){
        var f_size = 12; var articleContainer = $("#articleContainer");
        var articalWidth = 300, margins= 0;
        var trancatedLength = [ 0, 1 ];
        var htm = "<div class='parent selector'><div class='s'></div></div>";
        clearTimeout(setTimeOut);
        currentCoNumber = 1;
        var bodyHeight = window.innerHeight - articleContainer.offset().top - 10;
        var content = new FillContent(this.content);
        var i = 0, columns=-1;
        function recursive( ) {
            var removeHeight = margins + 50;
            if (trancatedLength[1] <= 0) {
                articleContainer.append('<br style="clear:both" />');
                return;
            }
            i++;
            var elem;
            articleContainer.width((i - columns) * (articalWidth + margins));
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
            current = current || elemets.eq(0);
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