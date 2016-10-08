import {
    Meteor
} from 'meteor/meteor';
import {
    HTTP
} from 'meteor/http';

Meteor.publish("userData", function() {
    return Meteor.users.find({
        _id: this.userId
    });
});

Meteor.methods({
    requestRelatedActivitiesByActivityId: function(id) {
        this.unblock();
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id + "/related";

        return HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

    },
    requestActivityByActivityId: function(id) {
        this.unblock();
        var token = Meteor.user().services.strava.accessToken;
        var url = "https://www.strava.com/api/v3/activities/" + id;

        return HTTP.call('GET', url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    },
    requestAthleteUnitPreference: function() {
      this.unblock();
      var token = Meteor.user().services.strava.accessToken;
      var url = "https://www.strava.com/api/v3/athlete";

      return HTTP.call('GET', url, {
          headers: {
              "Authorization": "Bearer " + token
          }
      });
    }
});
