import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import NewProjectNavbar from "./NewProjectNavbar.jsx";

	describe("NewProjectNavbar", function() {
		it("should render new project navbar", function() {
			let item = shallow(<NewProjectNavbar />);
			assert(item.find(".new_project_navbar"));
			assert(item.find(".new_project_row"));
			assert(item.find(".btn_go_back"));
			assert(item.find(".fa-arrow-left"));
			assert(item.find(".new_project_title"));
			assert(item.find(".btn_remove_project"));
			assert(item.find(".fa-trash"));

			assert.equal(item.find("Container").length , 1);
			assert.equal(item.find("Row").length , 1);
			assert.equal(item.find("a").length , 2);			
			assert.equal(item.find("i").length , 2);			
		});		
	});
}
