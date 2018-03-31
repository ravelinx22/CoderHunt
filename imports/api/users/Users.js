import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Projects } from "../projects/Projects";
import { Likes } from "../likes/Likes";


if (Meteor.isServer) {

	Meteor.publish("users", function usersPublication() {
		return Meteor.users.find({});
	});

	Meteor.publish("usersByLanguage", function usersByLanguage(language) {
		return Meteor.users.find({ languages: language });
	});

	Meteor.publish("usersForProjects", function usersForProject() {
		var projects = Projects.find({ userId: this.userId });
		var projectsLanguages = [];

		projects.map((project) => {
			project.tags.map((tag) => {
				if (!projectsLanguages.includes(tag))
					projectsLanguages.push(tag);
			});
		});

		var likes = Likes.find({projectOwnerId: this.userId});
		var usersLikedBefore = likes.map((like) => {
			if(!like.comingFromUser)
				return like.userId;
		});
		
		return Meteor.users.find({$nor:[{_id:{$in: usersLikedBefore}}, {_id:{$eq: this.userId}}], tags: { $in: projectsLanguages }});
	});
}

