import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Projects = new Mongo.Collection("projects");

Meteor.methods({
	"projects.insert"(object) {
		//		check(object.name, String);
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Projects.insert({
			name: object.name,
			description: object.description,
			tags: object.tags,
			createdAt: new Date(),
			userId: this.userId,
			username: Meteor.users.findOne(this.userId).services.github.username,
		});
	},
	"projects.remove"(projectId) {
		// check
		const project = Projects.findOne(projectId);
		if(project.userId !== this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Project.remove(projectId);
	}
});
