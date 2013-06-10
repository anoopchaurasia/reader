fm.Package("com.reader.hash");
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function(base, me){this.setMe=function(_me){me=_me};
	this.RegisterHash = function () {
		base();
		this.route =[
			{
				path: "articles",
				controller: "com.reader.article.Articles"
			},
			{
				path: "articles/:id",
				controller: "com.reader.article.Articles"
			}
		];
	};

	this.onUrlChange = function(url){
		console.log("Found", url);
	};
}