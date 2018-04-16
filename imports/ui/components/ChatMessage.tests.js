import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ChatMessage from "./ChatMessage.jsx";

	describe("ChatMessage", function() {
		it("should render enter chat message", function() {
			const send = {senderId: ""};
			let item = shallow(<ChatMessage chat={send} />);
			assert(item.find(".chat"));
			assert(item.find(".right"));

			assert.equal(item.find("li").length , 1);
			assert.equal(item.find("img").length , 1);
		});
	});

}
