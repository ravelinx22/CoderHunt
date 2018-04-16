import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ProjectsNavbar from "./ProjectsNavbar.jsx";

	describe("ProjectsNavbar", function() {
		it("should render projects navbar", function() {
			let item = shallow(<ProjectsNavbar />);
			assert(item.find(".chat_navbar"));
			assert(item.find(".chat_navbar_row"));
			assert(item.find(".btn_go_back"));
			assert(item.find(".fa-arrow-left"));
			assert(item.find(".chat_title"));
			assert(item.find(".btn_remove_chat"));
			assert(item.find(".fa-trash"));
		});
	});
}
