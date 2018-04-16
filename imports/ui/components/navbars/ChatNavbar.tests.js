import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";
import { Chats  } from "../../../api/chats/Chats.js";

if(Meteor.isClient) {
	import ChatNavbar from "./ChatNavbar.jsx";

	describe("ChatNavbar", function() {
		let currentChat;

		beforeEach(function() {
			resetDatabase();
			const userId = faker.lorem.word(); 
			Chats.insert({
				userId: userId,
				userName: faker.name.findName(),
				projectOwnerId: faker.lorem.word(),
				projectOwnerName: faker.name.findName(),
				projectId: faker.lorem.word(),
				createdAt: new Date(),
				projectName: faker.lorem.word(),
			});

			currentChat = Chats.findOne({userId: userId});
		});

		afterEach(() => {
			resetDatabase();
		});

		it("should render chat navbar", function() {
			let item = shallow(<ChatNavbar chatId={currentChat._id}/>);
			assert(item.find(".chat_navbar"));
			assert(item.find(".align_items_center"));
			assert(item.find(".chat_navbar_row"));
			assert(item.find(".fa-arrow-left"));
			assert(item.find(".chat_title"));
			assert(item.find(".rating_title"));
			assert(item.find(".rating_stars"));
			assert(item.find(".modal_rate"));
			assert(item.find(".btn_remove_chat"));
		});


	});

}
