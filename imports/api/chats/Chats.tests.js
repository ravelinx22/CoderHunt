import {Meteor} from 'meteor/meteor';
import { assert  } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { Chats  } from "./Chats.js";
import { resetDatabase   } from "meteor/xolvio:cleaner";
import { Factory   } from "meteor/dburles:factory";
import { sinon   } from 'meteor/practicalmeteor:sinon';

if(Meteor.isServer) {
	describe("chats", function() {
		let currentUser;

		beforeEach(function() {
			resetDatabase();
			Factory.define("user", Meteor.users, {
				image_url: faker.image.imageUrl(),
				userName: faker.name.findName(),
			});

			currentUser = Factory.create("user");
			sinon.stub(Meteor, "userId");
			Meteor.userId.returns(currentUser._id);

			Chats.insert({
				userId: currentUser._id,
				userName: currentUser.userName,
				projectOwnerId: faker.lorem.word(),
				projectOwnerName: faker.name.findName(),
				projectId: faker.lorem.word(),
				createdAt: new Date(),
				updatedAt: new Date(),
				projectName: faker.lorem.word(),
			});
		});

		afterEach(() => {
			Meteor.userId.restore();
			resetDatabase();
		});	

		describe("chats.message", function() {
			it("should update the updatedAt date", function() {
				let newChat = Chats.findOne({userId: currentUser._id});
				let firstDate = newChat.updatedAt;

				Meteor.call("chats.message", newChat._id);

				newChat = Chats.findOne({userId: currentUser._id});
				let newDate = newChat.updatedAt;

				assert(firstDate < newDate);
			});

			it("should remove the chat", function() {
				let newChat = Chats.findOne({userId: currentUser._id});
				assert(newChat);
				Meteor.call("chats.remove", newChat._id);
				newChat = Chats.findOne({userId: currentUser._id});
				assert.equal(newChat, null);
			});
		});
	});
}

