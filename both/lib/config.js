import {
    Meteor
} from 'meteor/meteor';
import {
    Router
} from 'meteor/iron:router'

if(Meteor.isClient) {
    AccountsTemplates.configure({
        hideSignUpLink: true,
        texts: {
            title: {
                signIn: "",
            }
        }
    });
}

if(Meteor.isServer) {}