import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ProjectNavbar from "./ProjectNavbar.jsx";

	describe("ProjectNavbar", function() {
		it("should render project navbar", function() {
			let item = shallow(<ProjectNavbar />);
			assert(item.find(".chat_navbar"));
			assert(item.find(".align-items-center"));
			assert(item.find(".chat_navbar_row"));
			assert(item.find(".btn_go_back"));
			assert(item.find(".fa-arrow-left"));
			assert(item.find(".chat_title"));
			assert(item.find(".btn_remove_chat"));
			assert(item.find(".fa-trash"));
		});
	});

}
