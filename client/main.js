import {
    Template
} from 'meteor/templating';
import {
    Meteor
} from 'meteor/meteor';

import './main.html';

/* --------------GLOBAL --------------*/

AccountsTemplates.configure({
    hideSignUpLink: true,
    texts: {
        title: {
            signIn: "",
        }
    }
});

let recentActivities = new ReactiveArray();
Leaderboards = new Meteor.Collection('leaderboards');

// Adds +1 to the value of the index when displaying leaderboards.
// Instead of 0,1,2,3... we have 1,2,3,4...
Handlebars.registerHelper("plusOne", function(argument) {
    return parseInt(argument) + 1;
});

// Retrieves the athletes profile when the website is loaded
Tracker.autorun(function () {
    Meteor.subscribe('userData');
});

/* --------------RECENT ACTIVITIES --------------*/

// Retrieve
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
        belowOrigin: true,
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
    'submit form' (event) {
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
        }

    },
});



