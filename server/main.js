import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";
import {EJSON} from "meteor/ejson";
import {Random} from "meteor/random";
import {Logger} from "meteor/miktam:loggly";

Meteor.publish("userData", function () {
    return Meteor.users.find({
        _id: this.userId
    });
});

Meteor.publish('completeActivities', function() {
    let self = this;
    let user = Meteor.users.findOne(self.userId);

    Meteor.call('requestCompleteAthleteActivities',user,function (error, response) {
        if (response)
            Logger.info(result);
        else
            console.log(error);
    });
});

Meteor.publish('leaderboards', function (id) {
    let self = this;
    let user = Meteor.users.findOne(self.userId);


    if(user) {
        let requestData = {
            'id': id,
            'token': user.services.strava.accessToken,
        };

        let unit = "";
        Meteor.call('requestAthleteUnitPreference', requestData, function (error, response) {
            if (response)
                if (response == "feet") {
                    unit = "mph";
                } else {
                    unit = "kmh";
                } else {
                Logger.error(error);
                console.log(error)
            }
        });

        let leaderboards = [];
        let maxSpeedLeaderboard = new Leaderboard("Max Speed");
        let avgSpeedLeaderboard = new Leaderboard("Avg Speed");
        let maxWattsLeaderboard = new Leaderboard("Max Watts");
        let avgWattsLeaderboard = new Leaderboard("Avg Watts");
        let weightedAvgWattsLeaderboard = new Leaderboard("Weighted Avg Watts");
        let maxHrLeaderboard = new Leaderboard("Max Heart Rate");
        let avgHrLeaderboard = new Leaderboard("Avg Heart Rate");
        let kilojoulesLeaderboard = new Leaderboard("Work");
        let prCountLeaderboard = new Leaderboard("PRs");
        let avgCadenceLeaderboard = new Leaderboard("Avg Cadence");
        let achievementCountLeaderbord = new Leaderboard("Achievement Count");
        let kudosCountLeaderboard = new Leaderboard("Kudos Count");
        let sufferLeaderboard = new Leaderboard("Suffer Score");

        Meteor.call('requestRelatedActivities', requestData, function (error, response) {
            if (response) {
                let json = EJSON.parse(response.content);

                for (let i = 0; i < json.length; i++) {

                    let athlete = {
                        'name': json[i].athlete.firstname + " " + json[i].athlete.lastname,
                        'gender': json[i].athlete.sex,
                        'picUrl': json[i].athlete.profile_medium
                    };

                    let activity = new Activity(json[i], athlete);

                    maxSpeedLeaderboard.data.push(activity.getMaxSpeed(unit));
                    avgSpeedLeaderboard.data.push(activity.getAvgSpeed(unit));
                    maxWattsLeaderboard.data.push((activity.getMaxWatts()));
                    avgWattsLeaderboard.data.push(activity.getAvgWatts());
                    weightedAvgWattsLeaderboard.data.push(activity.getWeightedAvgWatts());
                    maxHrLeaderboard.data.push(activity.getMaxHr());
                    avgHrLeaderboard.data.push(activity.getAvgHr());
                    kilojoulesLeaderboard.data.push(activity.getKilojoules());
                    prCountLeaderboard.data.push(activity.getPrCount());
                    avgCadenceLeaderboard.data.push(activity.getAvgCadence());
                    achievementCountLeaderbord.data.push(activity.getAchievementCount());
                    kudosCountLeaderboard.data.push(activity.getKudosCount());
                    sufferLeaderboard.data.push(activity.getSufferScore());
                }
            } else {
                Logger.error(error, requestData);
                console.log(error);
            }
        });

        Meteor.call('requestSingleActivity', requestData, function (error, response) {
            if (response) {
                let json = EJSON.parse(response.content);

                let name = "";
                let gender = "";
                let picUrl = "";
                if(json.athlete.resource_state == "1") {
                    name = user.services.strava.firstname + " " + user.services.strava.lastname;
                    gender = user.services.strava.sex;
                    picUrl = user.services.strava.profile_medium;
                } else {
                    name = json.athlete.firstname + " " + json.athlete.lastname;
                    gender = json.athlete.sex;
                    picUrl = json.athlete.profile_medium;
                }

                let athlete = {
                    'name': name,
                    'gender': gender,
                    'picUrl': picUrl,
                };

                let activity = new Activity(json, athlete);

                maxSpeedLeaderboard.data.push(activity.getMaxSpeed(unit));
                avgSpeedLeaderboard.data.push(activity.getAvgSpeed(unit));
                maxWattsLeaderboard.data.push((activity.getMaxWatts()));
                avgWattsLeaderboard.data.push(activity.getAvgWatts());
                weightedAvgWattsLeaderboard.data.push(activity.getWeightedAvgWatts());
                maxHrLeaderboard.data.push(activity.getMaxHr());
                avgHrLeaderboard.data.push(activity.getAvgHr());
                kilojoulesLeaderboard.data.push(activity.getKilojoules());
                prCountLeaderboard.data.push(activity.getPrCount());
                avgCadenceLeaderboard.data.push(activity.getAvgCadence());
                achievementCountLeaderbord.data.push(activity.getAchievementCount());
                kudosCountLeaderboard.data.push(activity.getKudosCount());
                sufferLeaderboard.data.push(activity.getSufferScore());

                leaderboards.push(maxSpeedLeaderboard);
                leaderboards.push(avgSpeedLeaderboard);
                leaderboards.push(maxWattsLeaderboard);
                leaderboards.push(avgWattsLeaderboard);
                leaderboards.push(weightedAvgWattsLeaderboard);
                leaderboards.push(maxHrLeaderboard);
                leaderboards.push(avgHrLeaderboard);
                leaderboards.push(kilojoulesLeaderboard);
                leaderboards.push(prCountLeaderboard);
                leaderboards.push(avgCadenceLeaderboard);
                leaderboards.push(achievementCountLeaderbord);
                leaderboards.push(kudosCountLeaderboard);
                leaderboards.push(sufferLeaderboard);

                leaderboards.forEach(function (leaderboard) {
                    self.added("leaderboards", Random.id(), leaderboard);
                });
            } else {
                Logger.info(error, requestData);
                console.log(error);
            }
            self.ready();
        });
    } else {
        self.ready();
    }

});

// Various methods for querying the Strava API
Meteor.methods({
    requestRelatedActivities: function (requestData) {
        let url = "https://www.strava.com/api/v3/activities/" + requestData.id + "/related";

        let response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + requestData.token
            }
        });

        return response;

    },
    requestSingleActivity: function (requestData) {
        let url = "https://www.strava.com/api/v3/activities/" + requestData.id;

        let response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + requestData.token
            }
        });

        return response;
    },
    requestAthleteUnitPreference: function (requestData) {
        let url = "https://www.strava.com/api/v3/athlete";

        let response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + requestData.token
            }
        });
        let json = EJSON.parse(response.content);

        return json.measurement_preference;
    },
    requestAthleteRecentActivities: function () {
        let token = Meteor.user().services.strava.accessToken;
        let url = "https://www.strava.com/api/v3/athlete/activities";

        let response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        let json = EJSON.parse(response.content);

        let activities = [];

        for (let i = 0; i < 5; i++) {
            let activity = {
                'title': json[i].name,
                'id': json[i].id,
            };
            activities.push(activity);
        }

        return activities;
    },
    requestCompleteAthleteActivities: function(user) {
        let token = user.services.strava.accessToken;
        let url = "https://www.strava.com/api/v3/athlete/activities";

        let moreActivities = true;
        let page = 1;
        let activities = [];

        while(moreActivities) {
            let response = HTTP.call('GET', url, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: {
                    "page": page,
                    "per_page": 200,
                }
            });
            let json = EJSON.parse(response.content);

            json.forEach(function (activity) {
                activities.push({
                    'title': activity.name,
                    'id': activity.id,
                    'date': activity.start_date,
                });
            });

            if(json.length == 200) {
                page++;
            } else {
                moreActivities = false;
            }
        }
        return activities;
    },
});
