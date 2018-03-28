import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isServer) {
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
		user.prueba = "asfasff";
		return user;
	});
}
