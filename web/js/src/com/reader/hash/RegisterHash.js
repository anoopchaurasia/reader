fm.Package("com.reader.hash");
fm.Import("jfm.html.DomManager");
fm.Import("com.reader.setting.SettingsController");
fm.Import("com.reader.view.Home");
fm.Import("com.reader.view.Article");
fm.Class("RegisterHash","jfm.hash.HashChange");
com.reader.hash.RegisterHash = function(base, me, DomManager, Article, Home){this.setMe=function(_me){me=_me};
    'use strict';
    var lastState = {}; 
    this.RegisterHash = function () {
        base();
        this.route =[
           {
                path: "/source/:id",
                view: Home
           } 
            ,
            {
                path: "/source/:sourceId/article/:articleId",
                view: Article
            }
        ];

        this.defaultRoute = "/source/1";
        this.base.activateCurrent();
        setTemplates();
    };

    function setTemplates(){
        $("[fm-controller]").each(function(){
            var controller = fm.isExist(this.getAttribute('fm-controller'));
            controller.setTemplate(this, controller);
            new DomManager( $(this), new controller());
        });
    }
    var currentView;
    
    var oldKeyValue;
    this.onUrlChange = function(url, keyValue){
        if(currentView && url.view.toString() === currentView.toString() ){
            currentView.onChange(keyValue, oldKeyValue);
            oldKeyValue = keyValue;
            return;
        }else if(currentView){
            currentView.onStop();
        }
        var view = new url.view(keyValue);
        view.onStart(keyValue);
        currentView = view;
    };
};