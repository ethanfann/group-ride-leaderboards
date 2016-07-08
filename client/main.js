import {
    Template
} from 'meteor/templating';
import {
    EJSON
} from 'meteor/ejson';

import './main.html';


AccountsTemplates.configure({
    hideSignUpLink: true,
    texts: {
        title: {
            signIn: "",
        }
    }
});

Avatar.setOptions({
    customImageProperty: function() {
        var user = this;
        return Meteor.user().services.strava.profile_medium;
    }
});

Template.leaderboards.onCreated(function() {
    this.max_speeds = new ReactiveArray();
    this.max_watts = new ReactiveArray();
    this.average_heartrates = new ReactiveArray();
    this.max_heartrates = new ReactiveArray();
    this.kudos_counts = new ReactiveArray();
    this.comment_counts = new ReactiveArray();
    this.photo_counts = new ReactiveArray();
    this.average_cadences = new ReactiveArray();
    this.average_watts = new ReactiveArray();
    this.suffer_scores = new ReactiveArray();
    this.kilojoules = new ReactiveArray();
    this.activityTitle = new ReactiveVar();
});

Handlebars.registerHelper("plusOne", function(argument) {
    return parseInt(argument) + 1;
});

Template.leaderboards.helpers({
    get_max_speeds: function() {
        Template.instance().max_speeds.sort(function(a, b) {
            return b.max_speed - a.max_speed;
        });
        return Template.instance().max_speeds.get().slice(0, 5);
    },
    get_max_watts: function() {
        Template.instance().max_watts.sort(function(a, b) {
            return b.max_watt - a.max_watt;
        });
        return Template.instance().max_watts.get().slice(0, 5);
    },
    get_average_heartrates: function() {
        Template.instance().average_heartrates.sort(function(a, b) {
            return b.average_heartrate - a.average_heartrate;
        });
        return Template.instance().average_heartrates.get().slice(0, 5);
    },
    get_max_heartrates: function() {
        Template.instance().max_heartrates.sort(function(a, b) {
            return b.max_heartrate - a.max_heartrate;
        });
        return Template.instance().max_heartrates.get().slice(0, 5);
    },
    get_kudos_counts: function() {
        Template.instance().kudos_counts.sort(function(a, b) {
            return b.kudos_count - a.kudos_count;
        });
        return Template.instance().kudos_counts.get().slice(0, 5);
    },
    get_comment_counts: function() {
        Template.instance().comment_counts.sort(function(a, b) {
            return b.comment_count - a.comment_count;
        });
        return Template.instance().comment_counts.get().slice(0, 5);
    },
    get_photo_counts: function() {
        Template.instance().photo_counts.sort(function(a, b) {
            return b.photo_count - a.photo_count;
        });
        return Template.instance().photo_counts.get().slice(0, 5);
    },
    get_average_cadences: function() {
        Template.instance().average_cadences.sort(function(a, b) {
            return b.average_cadence - a.average_cadence;
        });
        return Template.instance().average_cadences.get().slice(0, 5);
    },
    get_average_watts: function() {
        Template.instance().average_watts.sort(function(a, b) {
            return b.average_watt - a.average_watt;
        });
        return Template.instance().average_watts.get().slice(0, 5);
    },
    get_suffer_scores: function() {
        Template.instance().suffer_scores.sort(function(a, b) {
            return b.suffer_score - a.suffer_score;
        });
        return Template.instance().suffer_scores.get().slice(0, 5);
    },
    get_kilojoules: function() {
        Template.instance().kilojoules.sort(function(a, b) {
            return b.kilojoule - a.kilojoule;
        });
        return Template.instance().kilojoules.get().slice(0, 5);
    },
    get_kilojoules: function() {
        Template.instance().kilojoules.sort(function(a, b) {
            return b.kilojoule - a.kilojoule;
        });
        return Template.instance().kilojoules.get().slice(0, 5);
    },
    getActivityTitle: function() {
        return Template.instance().activityTitle.get();
    },
});

Template.header.helpers({
  getUserName: function() {
      return Meteor.user().services.strava.firstname + " " + Meteor.user().services.strava.lastname;
  },
});

Template.header.events({
  "click #logout": function(event, template){
    Meteor.logout();
  }
});

Template.leaderboards.events({
    'submit form' (event, template) {
        event.preventDefault();

        var input = event.target.activityInput.value;

        if(input == "")
        {
          Materialize.toast('Enter a url!', 4000)
        }
        else{
          if (input.toLowerCase().includes("strava") == true) {
              result = input.split('/');
              id = result[result.length - 1];
          } else {
              id = input;
          }

          template.max_speeds.get().length = 0;
          template.max_watts.get().length = 0;
          template.average_heartrates.get().length = 0;
          template.max_heartrates.get().length = 0;
          template.kudos_counts.get().length = 0;
          template.comment_counts.get().length = 0;
          template.photo_counts.get().length = 0;
          template.average_cadences.get().length = 0;
          template.average_watts.get().length = 0;
          template.suffer_scores.get().length = 0;
          template.kilojoules.get().length = 0;

          Meteor.call("requestRelatedActivitiesByActivityId", id, function(error, result) {
              var json = EJSON.parse(result.content);

              for (var i = 0; i < json.length; i++) {
                  var max_speedEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      max_speed: (json[i].max_speed * 2.236936).toFixed(1),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var max_wattsEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      max_watt: (json[i].device_watts == true ? json[i].max_watts : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var average_heartrateEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      average_heartrate: (json[i].has_heartrate == true ? json[i].average_heartrate : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var max_heartrateEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      max_heartrate: (json[i].has_heartrate == true ? json[i].max_heartrate : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var kudos_countEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      kudos_count: json[i].kudos_count,
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var comment_countEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      comment_count: json[i].comment_count,
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var photo_countEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      photo_count: json[i].total_photo_count,
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var average_cadenceEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      average_cadence: (json[i].hasOwnProperty("average_cadence") ? json[i].average_cadence : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var average_wattsEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      average_watt: (json[i].device_watts == true ? json[i].average_watts : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var suffer_scoreEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      suffer_score: (json[i].hasOwnProperty("suffer_score") ? json[i].suffer_score : 0),
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };
                  var kilojouleEntry = {
                      name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                      kilojoule: json[i].kilojoules,
                      stravaURL: "https://www.strava.com/activities/" + json[i].id
                  };

                  template.max_speeds.push(max_speedEntry);
                  template.max_watts.push(max_wattsEntry);
                  template.average_heartrates.push(average_heartrateEntry);
                  template.max_heartrates.push(max_heartrateEntry);
                  template.kudos_counts.push(kudos_countEntry);
                  template.comment_counts.push(comment_countEntry);
                  template.photo_counts.push(photo_countEntry);
                  template.average_cadences.push(average_cadenceEntry);
                  template.average_watts.push(average_wattsEntry);
                  template.suffer_scores.push(suffer_scoreEntry);
                  template.kilojoules.push(kilojouleEntry);
              }
          });

          Meteor.call("requestActivityByActivityId", id, function(error, result) {
              var json = EJSON.parse(result.content);

              if (json.athlete.resource_state == '1') {
                  var name = Meteor.user().services.strava.firstname + " " + Meteor.user().services.strava.lastname;
              } else {
                  var name = json.athlete.firstname + " " + json.athlete.lastname
              }

              var max_speedEntry = {
                  name: name,
                  max_speed: (json.max_speed * 2.236936).toFixed(1),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var max_wattsEntry = {
                  name: name,
                  max_watt: (json.device_watts == true ? json.max_watts : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var average_heartrateEntry = {
                  name: name,
                  average_heartrate: (json.has_heartrate == true ? json.average_heartrate : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var max_heartrateEntry = {
                  name: name,
                  max_heartrate: (json.has_heartrate == true ? json.max_heartrate : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var kudos_countEntry = {
                  name: name,
                  kudos_count: json.kudos_count,
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var comment_countEntry = {
                  name: name,
                  comment_count: json.comment_count,
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var photo_countEntry = {
                  name: name,
                  photo_count: json.total_photo_count,
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var average_cadenceEntry = {
                  name: name,
                  average_cadence: (json.hasOwnProperty("average_cadence") ? json.average_cadence : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var average_wattsEntry = {
                  name: name,
                  average_watt: (json.device_watts == true ? json.average_watts : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var suffer_scoreEntry = {
                  name: name,
                  suffer_score: (json.hasOwnProperty("suffer_score") ? json.suffer_score : 0),
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };
              var kilojouleEntry = {
                  name: name,
                  kilojoule: json.kilojoules,
                  stravaURL: "https://www.strava.com/activities/" + json.id
              };

              template.activityTitle.set(json.name);
              template.max_speeds.push(max_speedEntry);
              template.max_watts.push(max_wattsEntry);
              template.average_heartrates.push(average_heartrateEntry);
              template.max_heartrates.push(max_heartrateEntry);
              template.kudos_counts.push(kudos_countEntry);
              template.comment_counts.push(comment_countEntry);
              template.photo_counts.push(photo_countEntry);
              template.average_cadences.push(average_cadenceEntry);
              template.average_watts.push(average_wattsEntry);
              template.suffer_scores.push(suffer_scoreEntry);
              template.kilojoules.push(kilojouleEntry);
          });
        }
    }
});
