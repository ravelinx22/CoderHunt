import {Meteor} from "meteor/meteor";
import { assert, chai  } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase   } from "meteor/xolvio:cleaner";
import { Factory   } from "meteor/dburles:factory";
import { sinon   } from 'meteor/practicalmeteor:sinon';
import { shallow, mount  } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import UserMenu from "./UserMenu.jsx";

	describe("UserMenu", function() {
		it("should render an user menu", function() {
			let item = mount(<UserMenu.WrappedComponent />);
			assert.equal(item.find("a").length , 1);
		});
	});
}
