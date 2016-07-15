import {
    Meteor
} from 'meteor/meteor';
import {
    HTTP
} from 'meteor/http';

Meteor.startup(function(){
  Kadira.connect('J5ZaR34WnN6p6hbpH', 'fc72b9e2-0b89-4392-9ac4-945e2b3385ec');
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});

Meteor.methods({
    requestRelatedActivitiesByActivityId: function(id) {
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id + "/related";

        var response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return response;
    },
    requestActivityByActivityId: function(id) {
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id;

        var response = HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return response;
    },
});
