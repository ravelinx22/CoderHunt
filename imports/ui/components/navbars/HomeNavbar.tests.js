import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import HomeNavbar from "./HomeNavbar.jsx";

	describe("HomeNavbar", function() {
		it("should render home navbar", function() {
			let item = shallow(<HomeNavbar />);
			assert(item.find(".home_navbar"));
			assert(item.find(".align_items_center"));
			assert(item.find(".home_navbar_row"));
			assert(item.find(".home_navbar_title"));
			assert(item.find(".switch_label"));

			assert.equal(item.find("Container").length , 1);
			assert.equal(item.find("span").length , 1);
			assert.equal(item.find("Row").length , 1);
			assert.equal(item.find("button").length , 0);
			assert.equal(item.find("div").length , 2);
		});


	});

}
