import {
    Meteor
} from "meteor/meteor";
import {
    HTTP
} from "meteor/http";
import {
    EJSON
} from "meteor/ejson";
import {
    Random
} from "meteor/random";

/*  Sends the authenticated athlete's record to the client.
 */
Meteor.publish("athlete", function () {
    let self = this;

    if (self.userId) {
        return Meteor.users.find({
            _id: this.selfId
        });
    } else {
        self.ready();
    }

});

/*  Sends the authenticated athlete's ride history to the client.
    Example Record:
    {
        'title': <activity name>,
        'id': <activity id>,
        'date': <activity date>,
    }
*/
Meteor.publish("athleteHistory", function (search) {
    let self = this;

    if (self.userId) {
        let user = Meteor.users.findOne(self.userId); // Retrieve user data

        Meteor.call("requestAthleteActivities", user, function (error, response) {
            if (!error) {
                response.forEach(function (activity) {
                    self.added('athleteHistory', Random.id(), activity)
                });

            } else {
                console.log(error);
            }
        });
        self.ready();
    } else {
        self.ready();
    }
})

/*
 */
Meteor.publish('leaderboards', function (id) {
    let self = this;
    let user = Meteor.users.findOne(self.userId); // Retrieve user data

    if (user) {
        // Build request data with id of the activity, and the user's strava access token
        let requestData = {
            'id': id,
            'token': user.services.strava.accessToken,
        };

        // Retrieve the authenticated athlete's preferred unit
        let unit = "";
        Meteor.call('requestPreferredUnit', requestData, function (error, response) {
            if (!error) {
                if (response === "feet") {
                    unit = "mph";
                } else {
                    unit = "kmh";
                }
            } else {
                console.log(error);
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

        Meteor.call('requestRelatedActivities', requestData, function (error, json) {
            if (!error) {

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
                console.log(error);
            }
        });

        Meteor.call('requestSingleActivity', requestData, function (error, json) {
            if (!error) {

                /*  Gender will be used in the future for leaderboard filtering options.

                    If the subitted activity ID belongs to the currently
                    authenticated athlete, the athlete object returned in the response will not contain
                    information for the athlete's name and other such information. This scenario needs to be 
                    handled with information obtained from the database. I think this behavior should be uniform, no?
                */
                let name = "";
                let gender = "";
                let picUrl = "";
                if (json.athlete.resource_state == "1") {
                    name = user.services.strava.firstname + " " + user.services.strava.lastname;
                    gender = user.services.strava.sex;
                    picUrl = user.services.strava.profile_medium;
                } else {
                    name = json.athlete.firstname + " " + json.athlete.lastname;
                    gender = json.athlete.sex;
                    picUrl = json.athlete.profile_medium;
                }

                // Activity data will be appended to this athlete object, then pushed to their respective leaderboard objects
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

                // Push all the leaderboard objects to the leaderboards array
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

                // Build the leaderboards subscription to the client by looping through the leaderboards array, assigning
                // a random id to each in the array. This is essentially a Mongo Collection that is passed as a data context
                // to Iron Router, which then provides the data to the leaderboards HTML template.
                leaderboards.forEach(function (leaderboard) {
                    self.added("leaderboards", Random.id(), leaderboard);
                });

            } else {
                console.log(error);
            }
            self.ready(); // Indicates the subscription is ready.
        });
    } else {
        self.ready(); // Indicate the subscription is ready even if something
    }

});

Meteor.methods({
    /*  Queries the Strava API for the related activities of a given activity ID. 
        Note that this returns athlete_count-1, and a supplement API call will 
        need to be made to retrieve the single activity belonging to the submitted 
        activity ID
    */
    requestRelatedActivities: function (requestData) {
        let url = "https://www.strava.com/api/v3/activities/" + requestData.id + "/related";

        let response;
        try {
            response = HTTP.call('GET', url, {
                headers: {
                    "Authorization": "Bearer " + requestData.token
                }
            });
        } catch (error) {
            response = error.response;
        }

        if (response.statusCode == 200) {
            console.log(response);
            return EJSON.parse(response.content);
        } else {
            throw new Meteor.Error("api-request-error", "Failed to retrieve related activities for activity id: " + requestData.id, response);
        }
    },
    /*  Queries the Strava API for the authenticated athlete's activity.
     */
    requestSingleActivity: function (requestData) {
        let url = "https://www.strava.com/api/v3/activities/" + requestData.id;

        let response;
        try {
            response = HTTP.call('GET', url, {
                headers: {
                    "Authorization": "Bearer " + requestData.token
                }
            });
        } catch (error) {
            response = error.response;
        }

        if (response.statusCode === 200) {
            return EJSON.parse(response.content);
        } else {
            throw new Meteor.Error("api-request-error", "Failed to retrieve activity for activity id: " + requestData.id, response);
        }
    },
    /*  Queries the Strava API for the authenticated athlete's unit preference.
        Returns either feet or meters
    */
    requestPreferredUnit: function (requestData) {
        let url = "https://www.strava.com/api/v3/athlete";

        let response;
        try {
            response = HTTP.call('GET', url, {
                headers: {
                    "Authorization": "Bearer " + requestData.token
                }
            });
        } catch (error) {
            response = error.response;
        }

        if (response.statusCode === 200) {
            return EJSON.parse(response.content).measurement_preference;
        } else {
            throw new Meteor.Error("api-request-error", "Failed to retrieve authenticated athlete's preferred unit", response);
        }
    },
    /*  Experimental feature for retrieving the authenticated athlete's complete activity to
        be used for a universal activity search.

        TODO:   This API call needs to be made async. As it is now all activities
                will have to be loaded before an leaderboard request is processed. 
                However, I am pushing it live as the activity loading only happens on first 
                page load.
    */
    requestAthleteActivities: function (user) {
        this.unblock();
        let token = user.services.strava.accessToken;
        let url = "https://www.strava.com/api/v3/athlete/activities";

        let moreActivities = true;
        let page = 1;
        let activities = [];

        while (moreActivities) {
            let response;
            try {
                response = HTTP.call('GET', url, {
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    data: {
                        "page": page,
                        "per_page": 200,
                    }
                });
            } catch (error) {
                response = error.response;
            }

            if (response.statusCode === 200) {
                let json = EJSON.parse(response.content);

                json.forEach(function (activity) {
                    activities.push({
                        'title': activity.name,
                        'id': activity.id,
                        'date': activity.start_date,
                    });
                });

                /*  Max amount of activities we can retrieve with one API call is 200
                    so there may be more to get if the request is completely filled
                    */
                if (json.length === 200) {
                    page++;
                } else {
                    moreActivities = false;
                }
            } else {
                throw new Meteor.Error("strava-api-error", "Failed to retrieve authenticated athlete's ride history", response);
            }

        }
        return activities;
    },
});