import { Meteor } from 'meteor/meteor';
import { assert } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { Likes } from "../likes/Likes";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';


if (Meteor.isServer) {

    describe("likes", function () {
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

        describe("likes.insert", function () {         
            it("should insert the like", function(){
                var a = {
                    userId: faker.lorem.word(),
                    projectId: faker.lorem.word(),
                    projectOwnerId: faker.lorem.word(),
                    comingFromUser: true,
                    dislike: false,
                    projectName: faker.lorem.word(),
                }
                assert.equal(Likes.findOne(a), null);
                Meteor.call("likes.insert", a);
                let like = Likes.findOne(a);
                assert(like);
            })

        })
    })
}