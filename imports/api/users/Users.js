import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Projects } from "../projects/Projects";

if (Meteor.isServer) {
	Meteor.publish("users", function usersPublication() {
		return Meteor.users.find({});
	});

	Meteor.publish("usersByLanguage", function usersByLanguage(language) {
		return Meteor.users.find({ languages: language });
	});

	Meteor.publish("usersForProjects", function usersForProject(userId) {
		var projects = Projects.find({ userId: userId });
		var projectsLanguages = [];

		projects.map((project) => {
			project.tags.map((tag) => {
				if (!projectsLanguages.includes(tag))
					projectsLanguages.push(tag);
			});
		});

		return Meteor.users.find({ tags: { $in: projectsLanguages }, _id: { $not: { $eq: userId } } });
	});
}

