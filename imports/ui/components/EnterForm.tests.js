import {Meteor} from "meteor/meteor";
import { assert, chai  } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase   } from "meteor/xolvio:cleaner";
import { Factory   } from "meteor/dburles:factory";
import { sinon   } from 'meteor/practicalmeteor:sinon';
import { shallow  } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import EnterForm from "./EnterForm.jsx";

	describe("EnterForm", function() {
		it("should render enter form", function() {
			let item = shallow(<EnterForm />);
			assert(item.find(".change_log"));
			assert(item.find(".change_active"));
			assert(item.find(".change_log_sign"));
			assert(item.find(".github_row"));
			assert(item.find(".enter_github"));
			assert(item.find(".fa_github"));

			assert.equal(item.find("form").length , 1);
			assert.equal(item.find("button").length , 4);
			assert.equal(item.find("Row").length , 2);
		});

	});
}
