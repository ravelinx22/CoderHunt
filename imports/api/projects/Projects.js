import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Likes } from "../likes/Likes";

export const Projects = new Mongo.Collection("projects");

export const projectsForUser = function () {
	var user = Meteor.users.findOne({ _id: Meteor.userId() });
	var languages = [];

	if (user && user.tags)
		languages = user.tags;

	var userLikes = Likes.find({ userId: Meteor.userId() });
	var projectsWithUserLike = userLikes.map((like) => {
		var today = new Date();
		var diffMs = (today - like.createdAt);
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

		if (like.comingFromUser && !like.dislike || like.dislike && (diffMins < 5))
			return like.projectId;
	});
	return Projects.find({ _id: { $not: { $in: projectsWithUserLike } }, tags: { $in: languages }, userId: { $not: { $eq: Meteor.userId() } } });
}

if (Meteor.isServer) {
	Meteor.publish('projects', function projectsPublication() {
		return Projects.find({});
	});

	Meteor.publish('projectsForUser', function () {
		var user = Meteor.users.findOne({ _id: this.userId });
		var languages = [];

		if (user)
			languages = user.tags;

		var userLikes = Likes.find({ userId: this.userId });
		var projectsWithUserLike = userLikes.map((like) => {
			if (like.comingFromUser)
				return like.projectId;
		});
		return Projects.find({ _id: { $not: { $in: projectsWithUserLike } }, tags: { $in: languages }, userId: { $not: { $eq: this.userId } } });
	});
}

Meteor.methods({
	"projects.insert"(object) {
		check(object, {
			name: String,
			description: String,
			tags: Array,
			image_url: String,
		});
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Projects.insert({
			name: object.name,
			description: object.description,
			tags: object.tags,
			image_url: object.image_url,
			createdAt: new Date(),
			userId: Meteor.userId(),
			username: (Meteor.users.findOne(Meteor.userId()).username ? Meteor.users.findOne(Meteor.userId()).username : Meteor.users.findOne(Meteor.userId()).services.github.username)
		});
	},
	"projects.remove"(projectId) {
		check(projectId, String);
		const project = Projects.findOne(projectId);
		if (project.userId !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Projects.remove(projectId);
	}
});

