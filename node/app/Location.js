fm.Package("app");
fm.Class("Location", "Base");
app.Location = function (base, me, Base){this.setMe=function(_me){me=_me;};

	this.method = function( req, resp ) {
		console.log("Found Location", req.params);
		resp.write(JSON.stringify({isTrue:true}));
		resp.end();
	};

	this.saveLocation = function(req, resp){
		console.log("Save Location");
		resp.end();
	};
};