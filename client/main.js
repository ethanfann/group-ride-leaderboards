import {
    Template
} from 'meteor/templating';
import {
    Meteor
} from 'meteor/meteor';
import {
    Router
} from 'meteor/iron:router'

import './main.html';

AccountsTemplates.configure({
    hideSignUpLink: true,
    texts: {
        title: {
            signIn: "",
            signUp: ""
        },
    }
});
Template['my-atSocial'].replaces('atSocial');

Leaderboards = new Meteor.Collection('leaderboards');
Activities = new Meteor.Collection('athleteHistory');

// Adds +1 to the value of the index when displaying leaderboards.
// Instead of 0,1,2,3... we have 1,2,3,4...
Handlebars.registerHelper("plusOne", function (argument) {
    return parseInt(argument) + 1;
});

Tracker.autorun(function () {
    Meteor.subscribe('athlete');
    Meteor.subscribe('athleteHistory');
});

/* --------------HEADER--------------*/
Template.header.helpers({
    loading: function () {
        let data = Activities.find();
        if (data.count() === 0) {
            return true;
        } else {
            return false;
        }
    }
})

/* --------------ACTIVITY SEARCH--------------*/
Template.activitySearch.onCreated(function () {
    Session.set('searchText', '');
    Session.set('focused', false);
});

Template.activitySearch.helpers({
    search: function () {
        if (Session.get('searchText') !== '') {
            let regExp = Session.get('searchText');

            return Activities.find({
                title: {
                    $regex: regExp,
                    $options: "i"
                }
            }, {
                limit: 5
            }).fetch();
        } else {
            return Activities.find({}, {
                limit: 5
            });
        }
    },
    focused: function () {
        return Session.get('focused');
    },
    loading: function () {
        let data = Activities.find();
        if (data.count() === 0) {
            return true;
        } else {
            return false;
        }
    }
});

Template.activitySearch.events({
    "keyup input#activitySearch" (event, template) {
        let value = event.target.value.trim();
        Session.set('searchText', value);
    },
    "focus input#activitySearch" (event, template) {
        Session.set('focused', true);
    },
    "mousedown #searchResultLink" (event, template) {
        let url = event.target.href;
        Session.set('focused', false);
        Router.go(url);
    },
    "blur #searchForm" (event, template) {
        Session.set('focused', false);
    },
    "click #clear" (event, template) {
        document.getElementById("activitySearch").value = "";
        Session.set("searchText", "");
    },
    'submit form' (event) {
        event.preventDefault();
        let input = event.target.activitySearch.value;
        let id = "";
        let splitResult = [];
        let flag = false;
        if (input.toLowerCase().includes("strava.com") && input.toLowerCase().includes("activities")) {

            splitResult = input.split('/');

            splitResult.forEach(function (potentialId) {
                if (!isNaN(potentialId)) {
                    id = potentialId;
                    flag = true;
                }
            });
        }

        if (flag) {
            Router.go('/' + id);
        } else {
            Materialize.toast('Looks like there was something wrong with the url', 4000);
        }

    },
})

/* --------------LEADERBOARDS --------------*/
Template.leaderboards.helpers({
    leaderboards: function () {
        let leaderboards = Leaderboards.find().fetch();

        for (let i = 0; i < leaderboards.length; i++) {
            leaderboards[i].data.sort(function (a, b) {
                return b.value - a.value;
            });
        }

        return leaderboards;
    },
});