require("./config/web.js");
require('jsfm-starter');
fm.basedir = __dirname;

var server = require('http').createServer().listen(web.port);
Starter.handle(server);