import {Meteor} from "meteor/meteor";
import { assert, chai   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';
import { shallow, mount   } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import CardDetailPage from "./CardDetailPage.jsx";

	describe("CardDetailPage", function() {
		it("should render card detail page", function() {
			let item = shallow(<CardDetailPage isUserMode = {true} match = {{params: {id: faker.lorem.word()}}} />);

            assert(item.find(".data_detail"));
            assert(item.find(".data_content"));
            assert(item.find(".detail_img"));
            assert(item.find(".info_container"));
            assert(item.find(".detail_name"));
            assert(item.find(".detail_username"));
		});

	});

}
