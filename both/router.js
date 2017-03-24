import {
    Meteor
} from 'meteor/meteor';
import {
    Router
} from 'meteor/iron:router'

if(Meteor.isClient) {
    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'leaderboardLoader',
        notFoundTemplate: 'leaderboards',
    });
    Router.route('/', function() {
        this.render("leaderboards");
    });
    Router.route('/:id',{
        waitOn : function(){
            let id = this.params.id;
            return Meteor.subscribe('leaderboards', id);
        },
        action : function () {
            if (this.ready()) {
                this.render('leaderboards');
            } else {
                this.render('leaderboardLoader');
            }
        }
    });
}
