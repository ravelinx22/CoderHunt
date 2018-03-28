import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { userInfoPromise } from "../../data"
import "isomorphic-fetch"


if (Meteor.isServer) {
	ServiceConfiguration.configurations.upsert(
		{ service: 'github' },
		{
			$set: {
				loginStyle: "popup",
				clientId: Meteor.settings.CLIENT_ID,
				secret: Meteor.settings.CLIENT_SECRET
			}
		}
	);

	Accounts.onCreateUser((options, user) => {

		var promisedResult = fetch('https://api.github.com/user?access_token=' + user.services.github.accessToken)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					user.name = json.name;
					user.image_url = json.avatar_url;
					user.description = json.bio;
					return fetch('https://api.github.com/user/repos?access_token=' + user.services.github.accessToken);
				})
				.then((res) => {
					return res.json();
				})
				.then((repos) => {
					user.repos = [];

					var repositories = repos;
					repositories.map((repo) => {
						user.repos.push({
							name: repo.name,
							description: repo.description,
							language: repo.language
						});
					});

					user.languages = [];
					user.repos.map((repo) => {
						if (!user.languages.includes(repo.language) && repo.language)
							user.languages.push(repo.language);
					});
					return user;
				});
		
		return promisedResult.await();
	});
}
