fm.Package("com.reader.controller");
fm.Import("com.reader.source.Sources");
fm.Import( "jfm.html.DomManager");
fm.Import("com.reader.setting.Settings");
fm.Class("SourceController", 'com.reader.controller.MainController');
com.reader.controller.SourceController = function (base, me, Sources, DomManager, Settings) {
    this.setMe = function (_me) { me = _me; };
    var winDowResize;
    this.SourceController = function () {
    	base();
    	var minWidth = 150;
    	me.hideText = window.innerWidth * 15/100 < minWidth;
        me.sources = Sources.getInstance();
        winDowResize = Settings.getInstance().on('window-resize', function(a, b){
            if(a * 15/100 < minWidth ){
                me.hideText = true;
            }else{
                me.hideText = false;
            }
            if( a* 15/100 < minWidth && b* 15/100 > minWidth || a* 15/100 > minWidth && b* 15/100 < minWidth){
                me.callAll("change", 'hideText');
            }
        });
    };
};
