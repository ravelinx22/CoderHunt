import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Chats = new Mongo.Collection("chats");

if(Meteor.isServer) {
	Meteor.publish("chats", () => {
		return Chats.find({});
	});
}

Meteor.methods({
	"chats.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Chats.insert({
			userId: object.userId,
			projectOwnerId: object.projectOwnerId,
			projectId: object.projectId,
			createdAt: new Date(),
		})
	},
	"chats.remove"(chatId) {
		// check
		Chats.remove(chatId);
	}
});
