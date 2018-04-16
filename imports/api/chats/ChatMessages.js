import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const ChatMessages = new Mongo.Collection("chatmessages");

if (Meteor.isServer) {
	Meteor.publish("chatmessages", () => {
		return ChatMessages.find({});
	});
}

Meteor.methods({
	"chatmessages.insert"(object) {
		check(object, {
			senderId: String,
			message: String,
			chatId: String,
		});

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		ChatMessages.insert({
			senderId: object.senderId,
			message: object.message,
			chatId: object.chatId,
			image_url: Meteor.users.findOne(Meteor.userId()).image_url,
			isSeen: false,
			createdAt: new Date(),
		})
	},
	"chatmessages.seen"(messageId) {
		check(messageId, String);
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		ChatMessages.update({ _id: messageId }, { $set: { isSeen: true } });
	},
	"chatmessages.remove"(chatId) {
		check(chatId, String);
		ChatMessages.remove({ chatId: chatId });
	}
});
