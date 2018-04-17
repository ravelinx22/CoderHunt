import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import NewProjectPage from "./NewProjectPage.jsx";

	describe("NewProjectPage", function() {
		it("should render new project page", function() {
			let item = shallow(<NewProjectPage/>);

            assert(item.find(".create_project"));
            assert(item.find(".create_project_content"));
            assert(item.find(".create_project_form"));
            assert(item.find(".insert_photo"));
            assert(item.find(".description"));
		});

	});
}
