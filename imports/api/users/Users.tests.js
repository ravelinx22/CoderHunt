import { Meteor } from 'meteor/meteor';
import { assert } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Projects } from "../projects/Projects";
import "./Users"

if (Meteor.isServer) {

    describe("users", function () {
        let user;

        beforeEach(function () {
            resetDatabase();
            user = Factory.create("user");

            sinon.stub(Meteor, "userId");
            Meteor.userId.returns(user._id);
            Meteor.users.update({ _id: user._id },
                {
                    $set: {
                        services: { github: { username: faker.lorem.word() } },
                        numberOfLikes: 0,
                        userProjects: [],
                        usersRatedBefore: [],
                        projectsRatedBefore: []
                    }
                });
        });

        afterEach(() => {
            Meteor.userId.restore();
            resetDatabase();
        });

        describe("users.operations", function () {
            it("should increase in 1 user number of likes", function () {
                assert.equal(Meteor.users.findOne(user._id).numberOfLikes, 0);
                Meteor.call("users.updateLikeStats", user._id);
                assert.equal(Meteor.users.findOne(user._id).numberOfLikes, 1);
            })

            it("it should update user project stats", function () {
                var projectName = faker.lorem.word();
                var projectId = faker.lorem.word();

                Projects.insert({_id: projectId, tags: ["Java"]})

                var arg = {
                    createdAt: new Date(),
                    projectOwnerName: faker.lorem.word(),
                    projectOwnerId: faker.lorem.word(),
                    userName: faker.lorem.word(),
                    userId: user._id,
                    projectName: projectName,
                    projectId: projectId,
                }
                Meteor.call("users.updateProjectStats", arg);
                assert(Meteor.users.findOne({ _id: user._id }).userProjects.includes(projectName));
                assert.equal(Meteor.users.findOne({ _id: user._id }).projectsByLanguage.Java, 1);
            })

            it("should rate the user", function(){
                var newUser = Factory.create("user");

                Meteor.call("users.rateUser", newUser._id, 5);
                assert(Meteor.users.findOne(newUser._id).grade == 5)
            })

            it("should rate the project", function(){
                var projectId = faker.lorem.word();
                Projects.insert({_id: projectId, tags: ["Java"], numberOfRates: 0})

                Meteor.call("users.rateProject", projectId, 5)
                assert(Projects.findOne(projectId).grade == 5)
            })

            it("should return if an user has been rated befor", function (){
                var newUser = Factory.create("user");
                
                assert(!Meteor.call("users.ratedBefore", newUser._id));
                Meteor.call("users.rateUser", newUser._id, 5);
                assert(Meteor.call("users.ratedBefore", newUser._id));

            })
        })
    })
}