fm.Package("com.reader.source");
fm.Import("com.reader.article.Articles");
fm.Class("Source");
com.reader.source.Source = function (me, Articles) {
    this.setMe = function (_me) { me = _me; };
    this.Source = function (obj) {
        this.url = obj.url;
        this.id = obj.id;
        this.name = obj.name;
        this.thumbnail = obj.thumbnail;
    }

    this.getArticles = function(cb){
    	if(me.articles ){
            cb(me.articles);
        }else{
            loadData(me.url, function(data){
                me.articles = new Articles( data.responseData.feed );
                cb(me.articles);
            });
        }
    };

    function loadData (url, cb) {
        url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=9&callback=?&q=' + encodeURIComponent(url);
        $.ajax({
            url : url,
            dataType : 'json',
            success : cb,
            error: function(a){console.log(a)} 
        })
    }
}