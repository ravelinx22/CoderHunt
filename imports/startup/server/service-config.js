import { Meteor } from "meteor/meteor";

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
}
