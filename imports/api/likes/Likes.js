import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Likes = new Mongo.Collection("likes");

if(Meteor.isServer) {
	Meteor.publish("likes", () => {
		return Likes.find({});
	});
}

Likes.after.insert(function(likeId, doc) {
	const otherLike = Likes.findOne({
		userId: doc.userId,
		projectId: doc.projectId,
		comingFromUser: !doc.comingFromUser,
	});

	if(otherLike) {
		console.log("Theres a match");
		Meteor.call("matches.insert", {
			userId: doc.userId,
			projectId: doc.projectId,
		});
	}
});

Meteor.methods({
	"likes.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Likes.insert({
			userId: this.userId,
			projectId: object.projectId,
			comingFromUser: object.comingFromUser,
			createdAt: new Date(),
		});
	},
});
