import {
    Template
} from 'meteor/templating';
import {
    Meteor
} from 'meteor/meteor';

import './main.html';

/* --------------GLOBAL --------------*/

let recentActivities = new ReactiveArray();
Leaderboards = new Meteor.Collection('leaderboards');

Template.registerHelper('profilePic', function() {
    return Meteor.user().services.strava.profile_medium;
});

Handlebars.registerHelper("plusOne", function(argument) {
    return parseInt(argument) + 1;
});

Tracker.autorun(function () {
    Meteor.subscribe('userData');
});

/* --------------RECENT ACTIVITIES --------------*/

Template.recentActivities.onRendered(function(){
    Meteor.call("requestAthleteRecentActivities", function(error, result) {
        if (error) {
            console.log(error);
        } else {
            result.forEach(function(url) {
               recentActivities.push(url);
            });
        }
    });
    this.$(".dropdown-button").dropdown({
        belowOrigin: true // Displays dropdown below the button
    });
});

Template.recentActivities.helpers({
    recentActivities: function() {
        return recentActivities.list();
    },
});

/* --------------LEADERBOARDS --------------*/

Template.leaderboards.helpers({
    leaderboards: function() {
        let leaderboards =  Leaderboards.find().fetch();

        for(let i = 0; i < leaderboards.length; i++){
            leaderboards[i].data.sort(function (a, b) {
                return b.value - a.value;
            });
        }

        return leaderboards;
    }
});

/* --------------INPUT --------------*/

Template.input.events({
    'submit form' (event, template) {
        event.preventDefault();
        let input = event.target.activityInput.value;

        let id = "";
        let splitResult = [];
        let flag = false;
        if (input.toLowerCase().includes("strava.com") && input.toLowerCase().includes("activities")) {

            splitResult = input.split('/');

            splitResult.forEach(function (potentialId) {
                if(Number(potentialId) != 0) {
                    id = potentialId;
                    flag = true;
                }
            });
        }

        if(flag){
            Router.go('/' + id);
        } else {
            Materialize.toast('Looks like there was something wrong with the url', 4000);
            Logger.log({"Raw Input":input,"splitResult": splitResult, "Extracted Id": id})
        }

    },
});

/* --------------INPUT --------------*/

Template.footer.onRendered(function(){
    $('.modal-trigger').leanModal();
    $('select').material_select();
});
