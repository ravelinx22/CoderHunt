import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ChatList from "./ChatList.jsx";

	describe("ChatList", function() {
		it("should render chat list empty", function() {
			let item = mount(<ChatList/>);

			assert(item.find(".empty_chats_title"));
			assert(item.find(".chat_list"));
			assert.equal(item.find("ul").length , 1);
			assert.equal(item.find("div").length , 1);
		});
	});
}
