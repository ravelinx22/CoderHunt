import { Meteor } from 'meteor/meteor';
import { assert } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { Matches } from "../matches/Matches";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';


if (Meteor.isServer) {

    describe("matches", function () {
        let user;

        beforeEach(function() {
			resetDatabase();
            user = Factory.create("user");

			sinon.stub(Meteor, "userId");
			Meteor.userId.returns(user._id);
		});

        afterEach(() => {
            Meteor.userId.restore();
			resetDatabase();
		});	

        describe("matches.insert", function () {         
            it("should create a new match", function(){
                var a = {
                    userId: faker.lorem.word(),
                    projectId: faker.lorem.word(),
                }
                assert.equal(Matches.findOne(a), null);
                Meteor.call("matches.insert", a);
                assert(Matches.findOne(a));
            })

        })
    })
}