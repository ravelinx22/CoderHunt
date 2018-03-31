import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const ChatMessages = new Mongo.Collection("chatmessages");

if(Meteor.isServer) {
	Meteor.publish("chatmessages", () => {
		return ChatMessages.find({});
	});
}

Meteor.methods({
	"chatmessages.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		ChatMessages.insert({
			senderId: object.senderId,
			message: object.message,
			chatId: object.chatId,
			image_url: Meteor.users.findOne(this.userId).image_url,
			createdAt: new Date(),
		})
	},
	"chatmessages.remove"(messageId) {
		// check
		ChatMessages.remove(messageId);
	}
});
