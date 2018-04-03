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
		//Me parece muy interesante que hallan utilizado la posibilidad de autenticar con github.
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
							language: repo.language,
							url : repo.html_url,
							repoId: repo.id
						});
					});

					user.tags = [];
					user.repos.map((repo) => {
						if (!user.tags.includes(repo.language) && repo.language)
							user.tags.push(repo.language);
					});
					return user;
				});
		
		return promisedResult.await();
	});
}
