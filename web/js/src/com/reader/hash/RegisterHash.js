fm.Package("com.reader.hash");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.controller.SourceController");
fm.Import("com.reader.controller.ArticleListController");
fm.Import("com.reader.controller.ArticleController");
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function(base, me, DomManager, SourceController, ArticleController, ArticleListController){this.setMe=function(_me){me=_me};
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
			},
			{
				path: "/source/:sourceId/article/:articleId",
				controller: ArticleController,
				template: '/html/article.html',
				container : '#dynamic'
			}
		];
		setTemplates();
		this.base.activateCurrent();
	};

	function setTemplates(){
		$("[fm-controller]").each(function(){
			var controller = fm.isExist(this.getAttribute('fm-controller'));
			controller.setTemplate(this, controller);
			new DomManager( $(this), new controller());

		});
	}
	var currentConfig;
	this.onUrlChange = function(url, keyValue){
		currentConfig = [url, keyValue];
		if(currentController && typeof currentController.onStop === 'function'){
			lastState[currentController+""] = currentController.onStop();
		}
		var instance = new url.controller(lastState[url.controller+""]);
		var template = instance.getTemplate(instance);
	 	if(template && template.length){
	 		currentController = instance; 
			instance.onStart(keyValue, function(){
				$(url.container).html(template);
				var t = Date.now();
				new DomManager($(url.container), instance);
				console.log(Date.now() - t);
			});
			return;
	 	}
		jQuery.get(url.template, function(html){
			currentController = instance; 
			instance.setTemplate(html, instance);
			instance.onStart(keyValue, function(){
				$(url.container).html(instance.getTemplate(instance));
				new DomManager( $(url.container), instance);
			});

		});
		console.log("Found", url, keyValue);
	};
};