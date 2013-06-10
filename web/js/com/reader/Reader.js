fm.Package("com.reader");
fm.Import("com.reader.source.Sources");
fm.Import("com.reader.hash.RegisterHash");
fm.Import("com.reader.article.Articles");
fm.Class("Reader");
com.reader.Reader = function(me, Sources, RegisterHash, Articles){	this.setMe=function(_me){me=_me};
	Static.main = function  () {
		var source = new Sources();
		var articles;
		new RegisterHash();
		source.onChange(function(url){
			com.reader.Reader.parseRSS(url, function(data){
				articles = new Articles(data.responseData.feed);
			});
		});
	};

	Static.parseRSS = function(url, callback) {		
		url =  document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&callback=?&q=' + encodeURIComponent(url);
		$.ajax({
			url : url,
			dataType : 'json',
			success : callback
		});
	};
}