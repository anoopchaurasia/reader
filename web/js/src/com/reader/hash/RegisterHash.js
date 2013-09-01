fm.Package("com.reader.hash");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.controller.SourceController");
fm.Import("com.reader.controller.ArticleListController");
fm.Import("com.reader.controller.ArticleController");
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function(base, me, DomManager, SourceController, ArticleController, ArticleListController){this.setMe=function(_me){me=_me};
	'use strict';
	var currentController=[], lastState = {}; 
	this.RegisterHash = function () {
		base();
		this.route =[
			{
				path: "/source/:id",
				parts:[
					{
						controller: ArticleListController,
						template: '/html/articles.html',
						container : '#dynamic'
					},
					{
						controller:SourceController,
						template: '/html/sources.html',
						container : '#sourceList'
					}
				],
				clear:['#articleContContainer']
			},
			{
				path: "/source/:sourceId/article/:articleId",
				parts:[
					{
						controller: ArticleController,
						template: '/html/article.html',
						container : '#articleContContainer'
					}
				],
				clear:['#sourceList', "#dynamic"]
			}
		];

		this.defaultRoute = "/source/1";
		this.base.activateCurrent();
		setTemplates();
	};

	var currentConfig;
	function setTemplates(){
		$("[fm-controller]").each(function(){
			var controller = fm.isExist(this.getAttribute('fm-controller'));
			controller.setTemplate(this, controller);
			new DomManager( $(this), new controller());
		});
	}
	function applyUrlChange(url, keyValue){
		currentConfig = [url, keyValue];

		var instance = new url.controller(lastState[url.controller+""]);
	 	currentController.push(instance); 
		instance.getTemplate(url.template, function(template){
			instance.onStart(keyValue, function(){
				var t = Date.now();
				$(url.container).html(new DomManager(template, instance).el );
				console.log(Date.now() - t, "dff");
			});
		});
	}

	this.onUrlChange = function(url, keyValue){
		var parts = url.parts || [], clear = url.clear || [];
		while(currentController.length){
			currentController.pop().onStop();;
		}

		for(var i=0, len=clear.length; i<len; i++){
 			$(clear[i]).empty();
 		}
		for(var i=0, len=parts.length; i<len; i++){
			applyUrlChange(parts[i], keyValue);
		}
		console.log("Found", url, keyValue);
	};
};