import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Match } from 'meteor/check';

export const Matches = new Mongo.Collection("matches");

if(Meteor.isServer) {
	Meteor.publish("matches", () => {
		return Matches.find({});
	});
}

Matches.after.insert(function(matchId, doc) {
	console.log("Match created");
});

Meteor.methods({
	"matches.insert"(object) {
		check(object, Match.Optional({
			userId: String,
			projectId: String,
		}));

		if(!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Matches.insert({
		    userId: object.userId,
			projectId: object.projectId,
			createdAt: new Date(),
		});
	},
});
