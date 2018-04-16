import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Chats = new Mongo.Collection("chats");

if (Meteor.isServer) {
	Meteor.publish("chats", () => {
		return Chats.find({});
	});
}

Meteor.methods({
	"chats.insert"(object) {
		check(object, {
			userId: String,
			userName: String,
			projectOwnerId: String,
			projectOwnerName: String,
			projectId: String,
			createdAt: Date,
			projectName: String,
		});
		if (!Meteor.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Meteor.call("users.updateProjectStats", object);

		Chats.insert({
			userId: object.userId,
			userName: object.userName,
			projectOwnerId: object.projectOwnerId,
			projectOwnerName: object.projectOwnerName,
			projectId: object.projectId,
			createdAt: new Date(),
			updatedAt: new Date(),
			projectName: object.projectName,
		})
	},
	"chats.message"(chatId) {
		check(chatId, String);
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Chats.update({ _id: chatId }, { $set: { updatedAt: new Date() } });
	},
	"chats.remove"(chatId) {
		check(chatId, String);
		Chats.remove(chatId);
		Meteor.call("chatmessages.remove", chatId);
	},
});
