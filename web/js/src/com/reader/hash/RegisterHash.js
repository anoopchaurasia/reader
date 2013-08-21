fm.Package("com.reader.hash");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.controller.ArticleListController");
fm.Import("com.reader.controller.ArticleController");
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function(base, me, DomManager, ArticleController, ArticleListController){this.setMe=function(_me){me=_me};
	var currentController, lastState = {}; 
	this.RegisterHash = function () {
		base();
		this.route =[
			{
				path: "/source/:id",
				controller: ArticleListController,
				template: '/html/articles.html',
				container : '#dynamic'
			},
			{
				path: "/source/:sourceId/article/:articleId",
				controller: ArticleController,
				template: '/html/article.html',
				container : '#dynamic'
			}
		];
		this.base.activateCurrent();
	};

	this.onUrlChange = function(url, keyValue){
		if(currentController && typeof currentController.onStop === 'function'){
			lastState[currentController+""] = currentController.onStop();
		}
		jQuery.get(url.template, function(html){
			var instance = new url.controller(lastState[url.controller+""]);
			currentController = instance; 
			instance.onStart(keyValue, function(){
				$(url.container).html(html);
				new DomManager($("#dynamic"), instance);
			});

		});
		console.log("Found", url, keyValue);
	};
};