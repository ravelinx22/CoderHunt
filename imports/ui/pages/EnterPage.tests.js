import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import EnterPage from "./EnterPage.jsx";

	describe("EnterPage", function() {
		it("should render enter page", function() {
			let item = shallow(<EnterPage/>);

            assert(item.find(".enter_content"));
            assert(item.find(".image_side"));
            assert(item.find(".image_row"));
            assert(item.find(".landing_info"));
            assert(item.find(".enter_image_title"));
            assert(item.find(".enter_image_subtitle"));
            assert(item.find(".enter_side"));
		});

	});

}
