import "../imports/startup/server/service-config.js";
import "../imports/startup/server/slingshot-config.js";
import "../imports/api/projects/Projects.js";
import "../imports/api/likes/Likes.js";
import "../imports/api/matches/Matches.js";
import "../imports/api/users/Users.js";
import "../imports/api/chats/Chats.js";
import "../imports/api/chats/ChatMessages.js";
import { WebApp } from 'meteor/webapp';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

// Deny all client-side updates to user documents
Meteor.users.deny({
    update() { return true; }
});

const methods = [
    "chatmessages.insert",
    "chatmessages.seen",
    "chatmessages.remove",
    "chats.insert",
    "chats.message",
    "chats.remove",
    "likes.insert",
    "matches.insert",
    "projects.insert",
    "projects.remove",
    "users.updateLikeStats",
    "users.updateProjectStats",
    "users.ratedBefore"
]

// Only allow 5 list operations per connection per second
if (Meteor.isServer) {
    var requestLimit = 5;
    var requestTimeout = 1000;

    methods.map((met)=>{
        DDPRateLimiter.addRule({
            type: "method",
            name: met,
        }, requestLimit, requestTimeout);
    })
    
}