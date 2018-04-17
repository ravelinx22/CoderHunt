import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ChatPage from "./ChatPage.jsx";

	describe("ChatPage", function() {
		it("should render chat page", function() {
			let item = shallow(<ChatPage match = {{params: {id: faker.lorem.word()}}}/>);

            assert(item.find(".chats"));
		});

	});
}
