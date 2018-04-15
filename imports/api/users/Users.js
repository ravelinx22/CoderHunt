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
	"users.updateLikeStats"(userId) {
		Meteor.users.update({ _id: userId }, { $inc: { numberOfLikes: 1 } });
	},
	"users.updateProjectStats"(object) {
		Meteor.users.update({ _id: object.userId }, { $push: { userProjects: object.projectName } });

		Projects.findOne({ _id: object.projectId }, { fields: { _id: 0, tags: 1 } }).tags
			.forEach(element => {
				var query = {};
				query["projectsByLanguage." + element] = 1;
				Meteor.users.update({ _id: object.userId }, { $inc: query });
			});
	},
	"users.rateUser"(userId, grade) {
			var usersRatedBefore = Meteor.users.findOne({ _id: this.userId }).usersRatedBefore;
			var userInfoBeforeRating = Meteor.users.findOne({ _id: userId }, { grade: 1, _id: 0, numberOfRates: 1 });
			var newRating;

			var ratedBefore = usersRatedBefore && !usersRatedBefore.includes("userId") || !usersRatedBefore;

			if (userInfoBeforeRating.grade && userInfoBeforeRating.numberOfRates && ratedBefore)
				newRating = (userInfoBeforeRating.grade * userInfoBeforeRating.numberOfRates + grade) / (userInfoBeforeRating.numberOfRates + 1);
			else
				newRating = grade;

			Meteor.users.update({ _id: userId }, { $set: { numberOfRates: (userInfoBeforeRating.numberOfRates ? userInfoBeforeRating.numberOfRates + 1 : 1), grade: newRating } });
			Meteor.users.update({ _id: this.userId }, { $addToSet: { usersRatedBefore: userId } });
	},
	"users.rateProject"(projectId, grade) {
		console.log("hola " + projectId + " rate: " +grade );
		var projectsRatedBefore = Meteor.users.findOne({ _id: this.userId }).projectsRatedBefore;

			var projectInfoBeforeRating = Projects.findOne({ _id: projectId }, { grade: 1, _id: 0, numberOfRates: 1 });
			var newRating;

			var ratedBefore = projectsRatedBefore && !projectsRatedBefore.includes(projectId) || !projectsRatedBefore;

			if (projectInfoBeforeRating.grade && projectInfoBeforeRating.numberOfRates && ratedBefore )
				newRating = (projectInfoBeforeRating.grade * projectInfoBeforeRating.numberOfRates + grade) / (projectInfoBeforeRating.numberOfRates + 1);
			else
				newRating = grade;

			Projects.update({ _id: projectId }, { $set: { numberOfRates: (projectInfoBeforeRating.numberOfRates ? projectInfoBeforeRating.numberOfRates + 1 : 1), grade: newRating } });
			Meteor.users.update({ _id: this.userId }, { $addToSet: { projectsRatedBefore: projectId } });
	}
});

