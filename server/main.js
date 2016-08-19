import {
    Meteor
} from 'meteor/meteor';
import {
    HTTP
} from 'meteor/http';

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
