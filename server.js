var express = require("express");
var app = express();

//setting middleware
app.use(express.static(__dirname)); //Serves resources from public folder

var server = app.listen(5000, function (port) {
    console.log(`listening on port 5000`);
});
