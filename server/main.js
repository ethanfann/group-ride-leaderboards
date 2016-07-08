import {
    Meteor
} from 'meteor/meteor';
import {
    HTTP
} from 'meteor/http';


Avatar.setOptions({
  customImageProperty: function() {
    return Meteor.user().services.strava.profile_medium;
  }
});

Meteor.methods({
    requestRelatedActivitiesByActivityId: function(id) {
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id + "/related";

        return HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });;
    },
    requestActivityByActivityId: function(id) {
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id;

        return HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });;
    }
});

Meteor.startup(() => {});
