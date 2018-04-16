import { Meteor } from 'meteor/meteor';
import { assert } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { Projects } from "../projects/Projects";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';


if (Meteor.isServer) {

    describe("projects", function () {
        let user;

        beforeEach(function() {
			resetDatabase();
            user = Factory.create("user");

			sinon.stub(Meteor, "userId");
            Meteor.userId.returns(user._id);
            Meteor.users.update({_id: user._id}, {$set:{services: {github:{username: faker.lorem.word()}}}});
		});

        afterEach(() => {
            Meteor.userId.restore();
			resetDatabase();
		});	

        describe("projects.crud", function () {         
            it("should create a new project", function(){
                var a = {
                    name: faker.lorem.word(),
                    description: faker.lorem.word(),
                    tags: [faker.lorem.word(),faker.lorem.word(),faker.lorem.word()],
                    image_url: faker.image.imageUrl(),
                }

                assert.equal(Projects.findOne(a), null);
                Meteor.call("projects.insert", a);
                assert(Projects.findOne(a));
            })

            it("should delete project", function(){
                var project = {
                    name: faker.lorem.word(),
                    description: faker.lorem.word(),
                    tags: [faker.lorem.word(),faker.lorem.word(),faker.lorem.word()],
                    image_url: faker.image.imageUrl(),
                }

                Meteor.call("projects.insert", project);
                var insertedProject = Projects.findOne(project);
                assert(insertedProject);
                Meteor.call("projects.remove", insertedProject._id);
                assert.equal(Projects.findOne(insertedProject._id), null);
            })

        })
    })
}