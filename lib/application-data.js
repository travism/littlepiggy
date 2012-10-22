/**
 * Module that adds all of the data to the little piggy application. There are a few json database files that get
 * loaded in when the application loads.
 * @param application
 */
module.exports = function(application){
    var fs = require('fs'),
        _  = require('lodash'),
        currentTimestamp = parseInt(new Date().getTime() / 1000, 10);


    function isCurrentWeek(week){

        return (parseInt(currentTimestamp, 10) > parseInt(week.startdate, 10) &&
            parseInt(currentTimestamp, 10) < parseInt(week.enddate, 10));

    }

    function insertGames(application){

        var collections = [application.data.schedule.regularseason, application.data.schedule.playoffs];

        _.forEach(collections, function(col){

            _.forEach(col, function(week){
                var fname = "./data/schedule_" + week.id + ".json";

                fs.exists(fname, function (exists) {
                    if(exists) {
                        week.games = loadData(fname);

                        //If the current time is is within a current scheduled week then set the current weeks games
                        if(isCurrentWeek(week)){
                            application.data.schedule.current = week.games;
                        }
                    }
                });
            });
        }) ;
    }

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

    insertGames(application);

};

