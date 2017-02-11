/*
Helper class representing the leaderboard structure that we are
returning to the HTML templates. Name represents the metric name, i.e."Max Speed",
"Max Watts". Data is an array of entries obtained by activity transformation methods
 */

class _Leaderboard {
    constructor(name) {
        this.name = name;
        this.data  = [];
    }
} Leaderboard = _Leaderboard; //Makes class Global
