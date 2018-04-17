import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import NotFoundPage from "./NotFoundPage.jsx";

	describe("NotFoundPage", function() {
		it("should render not found page", function() {
			let item = shallow(<NotFoundPage/>);

            assert(item.find(".not_found"));
            assert(item.find(".not_found_title"));
		});

	});
}
