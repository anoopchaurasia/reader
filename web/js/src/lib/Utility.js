fm.Package('lib');
fm.Class("Utility");
lib.Utility = function (me){this.setMe=function(_me){me=_me;};
	var myRegEx = /<\/?[^<>]*\/?>/gim;
	Static.stripHTML = function (htmlStr) {
		var html = $("<div>"+htmlStr+"</div>");
		html.find("*").filter(function( ) {
			var tag = this.tagName.toLowerCase();
			return (tag != 'br' && $.trim($(this).text()) === '') || tag === 'script';
		})
		.remove();
		return html.html()
		.replace(/[\s\s]+|\n+/, " ")
		.replace(/\r\n|\sstyle=""|^\s/gim, "");
	};
};