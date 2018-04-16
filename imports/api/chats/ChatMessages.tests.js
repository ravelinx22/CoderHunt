import {Meteor} from 'meteor/meteor';
import { assert  } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { ChatMessages  } from "./ChatMessages.js";
import { resetDatabase   } from "meteor/xolvio:cleaner";
import { Factory   } from "meteor/dburles:factory";
import { sinon   } from 'meteor/practicalmeteor:sinon';

if(Meteor.isServer) {
	describe("chatmessages", function() {
		let currentUser;

		beforeEach(function() {
			resetDatabase();
			Factory.define("user", Meteor.users, {
				image_url: faker.image.imageUrl(),
			});

			currentUser = Factory.create("user");
			sinon.stub(Meteor, "userId");
			Meteor.userId.returns(currentUser._id);

			ChatMessages.insert({
				senderId: currentUser._id,
				message: faker.lorem.word(),
				chatId: faker.lorem.word(),
				image_url: faker.image.imageUrl(),
				isSeen: false,
				createdAt: new Date(),
			});
		});

		afterEach(() => {
			Meteor.userId.restore();
			resetDatabase();
		});	

		describe("chatmessages.seen", function() {
			it("should mark message as seen", function() {
				let newMessage = ChatMessages.findOne({senderId: currentUser._id});
				assert.equal(newMessage.isSeen, false);
				Meteor.call("chatmessages.seen", newMessage._id);
				newMessage = ChatMessages.findOne({senderId: currentUser._id});
				assert.equal(newMessage.isSeen, true);
			});

			it("should delete message", function() {
				let newMessage = ChatMessages.findOne({senderId: currentUser._id});
				assert(newMessage);
				Meteor.call("chatmessages.remove", newMessage.chatId);
				newMessage = ChatMessages.findOne({senderId: currentUser._id});
				assert.equal(newMessage, null);
			});

			it("should create message", function() {
				const object = {
					senderId: faker.lorem.word(),
					message: faker.lorem.word(),
					chatId: faker.lorem.word()
				}

				let newMessage = ChatMessages.findOne({senderId: object.senderId});
				assert.equal(newMessage, null);

				Meteor.call("chatmessages.insert", object);
				newMessage = ChatMessages.findOne({senderId: object.senderId});
				assert(newMessage);
			});
		});
	});
}

