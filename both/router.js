import {
    Meteor
} from 'meteor/meteor';
import {
    Router
} from 'meteor/iron:router'

if(Meteor.isClient) {
    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'leaderboards',
    });
    Router.route('/', function() {
        this.render("leaderboards");
    });
    Router.route('/contact', function() {
        this.render("email");
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
                this.render('loading');
            }
        }
    });
}

if(Meteor.isServer) {}