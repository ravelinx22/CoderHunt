import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import LookingCard from "./LookingCard.jsx";

	describe("LookingCard", function() {
		it("should render looking card", function() {
			let item = shallow(<LookingCard />);
			assert(item.find(".tinder--card"));
			assert(item.find(".looking--card"));
		});
	});
}
