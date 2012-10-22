(function() {

    this.data = {};

    var express = require('express'),
        jade = require('jade'),
        fs = require('fs'),
        app = express(),
        littlepiggy = this,
        port = process.argv[2];

    require('./lib/application-data')(this);

    app.configure(function(){
            app.set("view options", { layout: false, pretty: true });
            app.use(express.static(__dirname + '/public'));
        }
    );

    app.get('/', function(req, res){
        res.render((__dirname + "/views/index.jade"), littlepiggy.data);
    });

    app.listen(port);

    console.log("Application running on port: " + port);

})();