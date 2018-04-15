import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Projects } from "../projects/Projects";
import { Likes } from "../likes/Likes";

export const usersForProject = function () {
	var projects = Projects.find({ userId: Meteor.userId() });
	var projectsLanguages = [];

	projects.map((project) => {
		project.tags.map((tag) => {
			if (!projectsLanguages.includes(tag))
				projectsLanguages.push(tag);
		});
	});

	var likes = Likes.find({ projectOwnerId: Meteor.userId() });
	var usersLikedBefore = likes.map((like) => {
		var today = new Date();
		var diffMs = (today - like.createdAt);
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

		if (!like.comingFromUser && !like.dislike || like.dislike && (diffMins < 5))
			return like.userId;
	});

	return Meteor.users.find({ $nor: [{ _id: { $in: usersLikedBefore } }, { _id: { $eq: Meteor.userId() } }], tags: { $in: projectsLanguages } });
}

if (Meteor.isServer) {

	Meteor.publish("users", function usersPublication() {
		return Meteor.users.find({});
	});

	Meteor.publish("usersByLanguage", function usersByLanguage(language) {
		return Meteor.users.find({ languages: language });
	});

	Meteor.publish("usersForProjects", function () {
		return usersForProject();
	});
}

Meteor.methods({
	"users.updateLikeStats"() {
		Likes.find({ projectOwnerId: this.userId, comingFromUser: false, dislike: false }, { fields: { userId: 1, _id: 0 } })
			.forEach(element => {
				Meteor.users.update({ _id: element.userId }, { $inc: { numberOfLikes: 1 } });
			});
	},
	"users.updateProjectStats"(object) {
		Meteor.users.update({ _id: object.userId }, { $push: { userProjects: object.projectName } });

		Projects.findOne({ _id: object.projectId }, { fields: { _id: 0, tags: 1 } }).tags
			.forEach(element => {
				var query ={};
				query["projectsByLanguage." +  element] = 1;
				Meteor.users.update({ _id: object.userId },{ $inc: query} );
			});

	},
});

