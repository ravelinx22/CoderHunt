import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import Home from "./Home.jsx";

	describe("Home", function() {
		it("should render home page", function() {
			let item = shallow(<Home/>);

            assert(item.find(".swipe_content"));
		});

	});
}
