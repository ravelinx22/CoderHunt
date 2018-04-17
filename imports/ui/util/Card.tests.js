import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import Card from "./Card.jsx";

	describe("Card", function() {
		it("should render card", function() {
			const card  = {
				image_url: faker.image.imageUrl(),
				username: faker.lorem.word(),
				name: faker.lorem.word(),
				description: faker.lorem.word(),
			}

			let item = shallow(<Card card={card} />);
			assert(item.find(".card_info"));
			assert(item.find(".card_name"));
			assert(item.find(".card_username"));
			assert(item.find(".card_description"));

			assert.equal(item.find("img").length , 1);
		});
	});
}
