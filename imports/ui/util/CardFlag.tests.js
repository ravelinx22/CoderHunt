import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import CardFlag from "./CardFlag.jsx";

	describe("CardFlag", function() {
		it("should render card flags", function() {
			let item = shallow(<CardFlag name={faker.lorem.word()} />);
			assert(item.find(".card_flag"));
			assert.equal(item.find("div").length , 1);
		});
	});
}
