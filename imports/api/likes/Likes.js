import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Likes = new Mongo.Collection("likes");

if(Meteor.isServer) {
	Meteor.publish("likes", () => {
		return Likes.find({});
	});
}

Meteor.methods({
	"likes.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Likes.insert({
			ownerId: this.userId,
			destId: object.destId,
			createdAt: new Date(),
		});
	},
});
