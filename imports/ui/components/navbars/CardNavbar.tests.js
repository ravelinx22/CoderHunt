import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import CardNavbar from "./CardNavbar.jsx";

	describe("CardNavbar", function() {
		it("should render card navbar", function() {
			let item = shallow(<CardNavbar />);
			assert(item.find(".card_navbar"));
			assert(item.find(".align_items_center"));
			assert(item.find(".card_navbar_row"));
			assert(item.find(".fa-arrow-left"));
			assert(item.find(".card_title"));
			assert(item.find(".detail_card_buttons"));

			assert.equal(item.find("Container").length , 1);
			assert.equal(item.find("a").length , 1);
			assert.equal(item.find("Row").length , 1);
			assert.equal(item.find("button").length , 2);
			assert.equal(item.find("i").length , 3);
		});


	});

}
