import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ChatItem from "./ChatItem.jsx";

	describe("ChatItem", function() {
		it("should render not render a chat item", function() {
			const obj = {
				chat: {
					_id: faker.lorem.word(),
					userId: faker.lorem.word()
				}
			}
			let item = shallow(<ChatItem {...obj}/>);

			assert.equal(item.find("li").length , 0);
			assert.equal(item.find("img").length , 0);
			assert.equal(item.find("Link").length, 0);
		});

	});

}
