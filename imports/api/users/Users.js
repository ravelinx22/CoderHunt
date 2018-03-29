import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

if(Meteor.isServer) {
	Meteor.publish("users", function usersPublication() {
		return Meteor.users.find({});
	});

	Meteor.publish("usersByLanguage", function usersByLanguage(language){
		return Meteor.users.find({ languages: language });
	});
}

