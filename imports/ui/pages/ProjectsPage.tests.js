import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import ProjectsPage from "./ProjectsPage.jsx";

	describe("ProjectsPage", function() {
		it("should render projects page", function() {
			let item = shallow(<ProjectsPage/>);

            assert(item.find(".swipe_content"));
            assert.equal(item.find(".swipe_content").length, 1);
		});

	});
}
