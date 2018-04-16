import {Meteor} from "meteor/meteor";
import { assert, chai  } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase   } from "meteor/xolvio:cleaner";
import { Factory   } from "meteor/dburles:factory";
import { sinon   } from 'meteor/practicalmeteor:sinon';
import { shallow  } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import RepoItem from "./RepoItem.jsx";

	describe("RepoItem", function() {
		it("should render an repo item", function() {
			let item = shallow(<RepoItem/>);
			assert(item.hasClass("repo_item"));
			assert(item.find(".repo_name"));
			assert(item.find(".repo_info"));
			assert(item.find(".repo_lang"));
			assert(item.find(".repo_lang_color"));
			assert.equal(item.find("a").length , 1);
			assert.equal(item.find("p").length , 2);
			assert.equal(item.find("span").length , 1);
		});

	});
}
