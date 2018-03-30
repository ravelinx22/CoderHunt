import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Likes } from "../likes/Likes";

export const Projects = new Mongo.Collection("projects");

if (Meteor.isServer) {
	Meteor.publish('projects', function projectsPublication() {
		return Projects.find({});
	});

	Meteor.publish('projectsForUser', function projectsForUser(userId) {
		var user = Meteor.users.findOne({ _id: userId });
		var languages;

		if (user !== undefined)
			languages = user.tags;

		var userLikes = Likes.find({userId: userId});
		var projectsWithUserLike = userLikes.map((like) => {
			if(like.comingFromUser)
				return like.projectId; 
		});

		return Projects.find({_id: {$not: {$in: projectsWithUserLike}}, tags: { $in: languages }, userId: { $not: { $eq: userId } } });
	});
}

Meteor.methods({
	"projects.insert"(object) {
		//		check(object.name, String);
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Projects.insert({
			name: object.name,
			description: object.description,
			tags: object.tags,
			image_url: object.image_url,
			createdAt: new Date(),
			userId: this.userId,
			username: Meteor.users.findOne(this.userId).services.github.username,
		});
	},
	"projects.remove"(projectId) {
		// check
		const project = Projects.findOne(projectId);
		if (project.userId !== this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Projects.remove(projectId);
	}
});

