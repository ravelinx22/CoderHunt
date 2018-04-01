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
		projectOwnerId: doc.projectOwnerId,
		comingFromUser: !doc.comingFromUser,
	});

	if(otherLike) {
		const foundProjectId = (doc.projectId ? doc.projectId : otherLike.projectId);
		console.log("Theres a match");
		Meteor.call("chats.insert", {
			userId: doc.userId,
			userName: (Meteor.users.findOne({_id: doc.userId}).name ? Meteor.users.findOne({_id: doc.userId}).name : Meteor.users.findOne({_id: doc.userId}).services.github.username),
			projectOwnerId: doc.projectOwnerId,
			projectOwnerName:  (Meteor.users.findOne({_id: doc.projectOwnerId}).name ? Meteor.users.findOne({_id: doc.projectOwnerId}).name : Meteor.users.findOne({_id: doc.projectOwnerId}).services.github.username),
			projectId: foundProjectId ,
			createdAt: new Date(),
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
			userId: object.userId,
			projectId: object.projectId,
			projectOwnerId: object.projectOwnerId,
			comingFromUser: object.comingFromUser,
			createdAt: new Date(),
		});
	},
});
