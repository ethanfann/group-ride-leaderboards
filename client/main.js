import {
    Template
} from 'meteor/templating';
import {
    EJSON
} from 'meteor/ejson';


import './main.html';

$(document).ready(function() {
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
});

Meteor.startup(function() {
    Meteor.subscribe('userData');
});

AccountsTemplates.configure({
    hideSignUpLink: true,
    texts: {
        title: {
            signIn: "",
        }
    }
});

Template.leaderboards.onCreated(function() {
    this.max_speeds = new ReactiveArray();
    this.max_speeds_sort = new ReactiveVar(true);

    this.max_watts = new ReactiveArray();
    this.max_watts_sort = new ReactiveVar(true);

    this.average_heartrates = new ReactiveArray();
    this.average_heartrates_sort = new ReactiveVar(true);

    this.max_heartrates = new ReactiveArray();
    this.max_heartrates_sort = new ReactiveVar(true);

    this.kudos_counts = new ReactiveArray();
    this.kudos_counts_sort = new ReactiveVar(true);

    this.average_cadences = new ReactiveArray();
    this.average_cadences_sort = new ReactiveVar(true);

    this.average_watts = new ReactiveArray();
    this.average_watts_sort = new ReactiveVar(true);

    this.suffer_scores = new ReactiveArray();
    this.suffer_scores_sort = new ReactiveVar(true);

    this.kilojoules = new ReactiveArray();
    this.kilojoules_sort = new ReactiveVar(true);

    this.average_speeds = new ReactiveArray();
    this.average_speeds_sort = new ReactiveVar(true);

    this.achievements = new ReactiveArray();
    this.achievements_sort = new ReactiveVar(true);

    this.weighted_avg_watts = new ReactiveArray();
    this.weighted_avg_watts_sort = new ReactiveVar(true);
});

Handlebars.registerHelper("plusOne", function(argument) {
    return parseInt(argument) + 1;
});

Template.leaderboards.helpers({
    get_max_speeds: function() {
        if (Template.instance().max_speeds_sort.get() == true)
            Template.instance().max_speeds.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().max_speeds.sort(function(a, b) {
                return a.value - b.value;
            });
        }

        return Template.instance().max_speeds.get();
    },
    get_max_watts: function() {
        if (Template.instance().max_watts_sort.get() == true)
            Template.instance().max_watts.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().max_watts.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().max_watts.get().slice(0, 5);
    },
    get_average_heartrates: function() {
        if (Template.instance().average_heartrates_sort.get() == true)
            Template.instance().average_heartrates.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().average_heartrates.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().average_heartrates.get().slice(0, 5);
    },
    get_max_heartrates: function() {
        if (Template.instance().max_heartrates_sort.get() == true)
            Template.instance().max_heartrates.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().max_heartrates.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().max_heartrates.get().slice(0, 5);
    },
    get_kudos_counts: function() {
        if (Template.instance().kudos_counts_sort.get() == true)
            Template.instance().kudos_counts.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().kudos_counts.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().kudos_counts.get().slice(0, 5);
    },
    get_average_cadences: function() {
        if (Template.instance().average_cadences_sort.get() == true)
            Template.instance().average_cadences.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().average_cadences.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().average_cadences.get().slice(0, 5);
    },
    get_average_watts: function() {
        if (Template.instance().average_watts_sort.get() == true)
            Template.instance().average_watts.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().average_watts.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().average_watts.get().slice(0, 5);
    },
    get_suffer_scores: function() {
        if (Template.instance().suffer_scores_sort.get() == true)
            Template.instance().suffer_scores.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().suffer_scores.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().suffer_scores.get().slice(0, 5);
    },
    get_kilojoules: function() {
        if (Template.instance().kilojoules_sort.get() == true)
            Template.instance().kilojoules.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().kilojoules.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().kilojoules.get().slice(0, 5);
    },
    get_average_speeds: function() {
        if (Template.instance().average_speeds_sort.get() == true)
            Template.instance().average_speeds.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().average_speeds.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().average_speeds.get().slice(0, 5);
    },
    get_achievements: function() {
        if (Template.instance().achievements_sort.get() == true)
            Template.instance().achievements.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().achievements.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().achievements.get().slice(0, 5);
    },
    get_weighted_avg_watts: function() {
        if (Template.instance().weighted_avg_watts_sort.get() == true)
            Template.instance().weighted_avg_watts.sort(function(a, b) {
                return b.value - a.value;
            });
        else {
            Template.instance().weighted_avg_watts.sort(function(a, b) {
                return a.value - b.value;
            });
        }
        return Template.instance().weighted_avg_watts.get().slice(0, 5);
    },
    max_speeds_sort: function() {
        return Template.instance().max_speeds_sort.get();
    },
    max_watts_sort: function() {
        return Template.instance().max_speeds_sort.get();
    },
    average_heartrates_sort: function() {
        return Template.instance().average_heartrates_sort.get();
    },
    max_heartrates_sort: function() {
        return Template.instance().max_heartrates_sort.get();
    },
    kudos_counts_sort: function() {
        return Template.instance().kudos_counts_sort.get();
    },
    average_cadences_sort: function() {
        return Template.instance().average_cadences_sort.get();
    },
    average_watts_sort: function() {
        return Template.instance().average_watts_sort.get();
    },
    suffer_scores_sort: function() {
        return Template.instance().suffer_scores_sort.get();
    },
    kilojoules_sort: function() {
        return Template.instance().kilojoules_sort.get();
    },
    average_speeds_sort: function() {
        return Template.instance().average_speeds_sort.get();
    },
    achievements_sort: function() {
        return Template.instance().average_speeds_sort.get();
    },
    weighted_avg_watts_sort: function() {
        return Template.instance().weighted_avg_watts_sort.get();
    },
});


Template.leaderboards.events({
    'submit form' (event, template) {
        event.preventDefault();

        var input = event.target.activityInput.value;

        if (input.toLowerCase().includes("strava.com") == true) {
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
        template.average_cadences.get().length = 0;
        template.average_watts.get().length = 0;
        template.suffer_scores.get().length = 0;
        template.kilojoules.get().length = 0;
        template.average_speeds.get().length = 0;
        template.achievements.get().length = 0;
        template.weighted_avg_watts.get().length = 0;

        if (id != "") {
            Meteor.call("requestActivityByActivityId", id, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    var json = EJSON.parse(result.content);
                    console.log(json);

                    if (json.athlete.resource_state == '1') {
                        var name = Meteor.user().services.strava.firstname + " " + Meteor.user().services.strava.lastname;
                        var picURL = Meteor.user().services.strava.profile_medium;
                    } else {
                        var name = json.athlete.firstname + " " + json.athlete.lastname;
                        var picURL = json.athlete.profile_medium;
                    }

                    var max_speedEntry = {
                        name: name,
                        value: (json.max_speed * 2.236936).toFixed(1),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var max_wattsEntry = {
                        name: name,
                        value: (json.device_watts == true ? json.max_watts : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var average_heartrateEntry = {
                        name: name,
                        value: (json.has_heartrate == true ? json.average_heartrate : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var max_heartrateEntry = {
                        name: name,
                        value: (json.has_heartrate == true ? json.max_heartrate : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var kudos_countEntry = {
                        name: name,
                        value: json.kudos_count,
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var average_cadenceEntry = {
                        name: name,
                        value: (json.hasOwnProperty("average_cadence") ? json.average_cadence : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var average_wattsEntry = {
                        name: name,
                        value: (json.device_watts == true ? json.average_watts : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var suffer_scoreEntry = {
                        name: name,
                        value: (json.hasOwnProperty("suffer_score") ? json.suffer_score : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var kilojouleEntry = {
                        name: name,
                        value: json.kilojoules,
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var average_speedEntry = {
                        name: name,
                        value: (json.average_speed * 2.236936).toFixed(1),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var achievementEntry = {
                        name: name,
                        value: json.achievement_count,
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };
                    var weighted_avg_wattsEntry = {
                        name: name,
                        value: (json.device_watts == true ? json.weighted_average_watts : 0),
                        stravaURL: "https://www.strava.com/activities/" + json.id,
                        picURL: picURL
                    };

                    if (max_wattsEntry.value > 0)
                        template.max_watts.push(max_wattsEntry);
                    if (average_heartrateEntry.value > 0)
                        template.average_heartrates.push(average_heartrateEntry);
                    if (max_heartrateEntry.value > 0)
                        template.max_heartrates.push(max_heartrateEntry);
                    if (average_cadenceEntry.value > 0)
                        template.average_cadences.push(average_cadenceEntry);
                    if (average_wattsEntry.value > 0)
                        template.average_watts.push(average_wattsEntry);
                    if (suffer_scoreEntry.value > 0)
                        template.suffer_scores.push(suffer_scoreEntry);
                    if (weighted_avg_wattsEntry.value > 0)
                        template.weighted_avg_watts.push(weighted_avg_wattsEntry);

                    template.achievements.push(achievementEntry);
                    template.max_speeds.push(max_speedEntry);
                    template.kudos_counts.push(kudos_countEntry);
                    template.kilojoules.push(kilojouleEntry);
                    template.average_speeds.push(average_speedEntry);
                }
            });

            Meteor.call("requestRelatedActivitiesByActivityId", id, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    var json = EJSON.parse(result.content);
                    console.log(json);

                    for (var i = 0; i < json.length; i++) {
                        var max_speedEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].max_speed * 2.236936).toFixed(1),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var max_wattsEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].device_watts == true ? json[i].max_watts : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var average_heartrateEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].has_heartrate == true ? json[i].average_heartrate : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var max_heartrateEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].has_heartrate == true ? json[i].max_heartrate : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var kudos_countEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: json[i].kudos_count,
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var average_cadenceEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].hasOwnProperty("average_cadence") ? json[i].average_cadence : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var average_wattsEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].device_watts == true ? json[i].average_watts : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var suffer_scoreEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].hasOwnProperty("suffer_score") ? json[i].suffer_score : 0),
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var kilojouleEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: json[i].kilojoules,
                            stravaURL: "https://www.strava.com/activities/" + json[i].id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var average_speedEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].average_speed * 2.236936).toFixed(1),
                            stravaURL: "https://www.strava.com/activities/" + json.id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var achievementEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: json[i].achievement_count,
                            stravaURL: "https://www.strava.com/activities/" + json.id,
                            picURL: json[i].athlete.profile_medium
                        };
                        var weighted_avg_wattsEntry = {
                            name: json[i].athlete.firstname + " " + json[i].athlete.lastname,
                            value: (json[i].device_watts == true ? json[i].weighted_average_watts : 0),
                            stravaURL: "https://www.strava.com/activities/" + json.id,
                            picURL: json[i].athlete.profile_medium
                        };

                        if (max_wattsEntry.value > 0)
                            template.max_watts.push(max_wattsEntry);
                        if (average_heartrateEntry.value > 0)
                            template.average_heartrates.push(average_heartrateEntry);
                        if (max_heartrateEntry.value > 0)
                            template.max_heartrates.push(max_heartrateEntry);
                        if (average_cadenceEntry.value > 0)
                            template.average_cadences.push(average_cadenceEntry);
                        if (average_wattsEntry.value > 0)
                            template.average_watts.push(average_wattsEntry);
                        if (suffer_scoreEntry.value > 0)
                            template.suffer_scores.push(suffer_scoreEntry);
                        if (weighted_avg_wattsEntry.value > 0)
                            template.weighted_avg_watts.push(weighted_avg_wattsEntry);

                        template.achievements.push(achievementEntry);
                        template.max_speeds.push(max_speedEntry);
                        template.kudos_counts.push(kudos_countEntry);
                        template.kilojoules.push(kilojouleEntry);
                        template.average_speeds.push(average_speedEntry);
                    }
                }
            });
        }
    },
    'click #max_speeds_sort': function(event, template) {
        if (template.max_speeds_sort.curValue == true) {
            template.max_speeds_sort.set(false);
        } else {
            template.max_speeds_sort.set(true);
        }
    },
    'click #max_watts_sort': function(event, template) {
        if (template.max_watts_sort.curValue == true) {
            template.max_watts_sort.set(false);
        } else {
            template.max_watts_sort.set(true);
        }
    },
    'click #average_heartrates_sort': function(event, template) {
        if (template.average_heartrates_sort.curValue == true) {
            template.average_heartrates_sort.set(false);
        } else {
            template.average_heartrates_sort.set(true);
        }
    },
    'click #max_heartrates_sort': function(event, template) {
        if (template.max_heartrates_sort.curValue == true) {
            template.max_heartrates_sort.set(false);
        } else {
            template.max_heartrates_sort.set(true);
        }
    },
    'click #average_speeds_sort': function(event, template) {
        if (template.average_speeds_sort.curValue == true) {
            template.average_speeds_sort.set(false);
        } else {
            template.average_speeds_sort.set(true);
        }
    },
    'click #average_watts_sort': function(event, template) {
        if (template.average_watts_sort.curValue == true) {
            template.average_watts_sort.set(false);
        } else {
            template.average_watts_sort.set(true);
        }
    },
    'click #work_sort': function(event, template) {
        if (template.kilojoules_sort.curValue == true) {
            template.kilojoules_sort.set(false);
        } else {
            template.kilojoules_sort.set(true);
        }
    },
    'click #avg_cadence_sort': function(event, template) {
        if (template.average_cadences_sort.curValue == true) {
            template.average_cadences_sort.set(false);
        } else {
            template.average_cadences_sort.set(true);
        }
    },
    'click #suffer_score_sort': function(event, template) {
        if (template.suffer_scores_sort.curValue == true) {
            template.suffer_scores_sort.set(false);
        } else {
            template.suffer_scores_sort.set(true);
        }
    },
    'click #kudos_sort': function(event, template) {
        if (template.kudos_counts_sort.curValue == true) {
            template.kudos_counts_sort.set(false);
        } else {
            template.kudos_counts_sort.set(true);
        }
    },
    'click #achievements_sort': function(event, template) {
        if (template.achievements_sort.curValue == true) {
            template.achievements_sort.set(false);
        } else {
            template.achievements_sort.set(true);
        }
    },
    'click #weighted_avg_watts_sort': function(event, template) {
        if (template.weighted_avg_watts_sort.curValue == true) {
            template.weighted_avg_watts_sort.set(false);
        } else {
            template.weighted_avg_watts_sort.set(true);
        }
    },
});
