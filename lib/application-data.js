/**
 * Module that adds all of the data to the little piggy application. There are a few json database files that get
 * loaded in when the application loads.
 * @param application
 */
module.exports = function(application){
    var fs = require('fs');

    function loadData (filename, encoding ) {
        var val = "";
        try {
            // default encoding is utf8
            if (typeof (encoding) === 'undefined') {
                encoding = 'utf8';
            }

            var contents = JSON.parse(fs.readFileSync(filename, encoding));

            val = contents;

        } catch (err) {
            console.log(err);
        }

        return val;
    }

    application.data.players =  loadData("./data/players.json");
    application.data.teams = loadData("./data/teams.json");
    application.data.schedule = loadData("./data/schedule.json");
};

