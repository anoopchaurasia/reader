require("./config/web.js");
require('jsfm-starter');
fm.basedir = __dirname;

var server = require('http').createServer().listen(8088);
Starter.handle(server);