import "../imports/startup/server/service-config.js";
import "../imports/startup/server/slingshot-config.js";
import "../imports/api/projects/Projects.js";
import "../imports/api/likes/Likes.js";
import "../imports/api/matches/Matches.js";
import "../imports/api/users/Users.js";
import "../imports/api/chats/Chats.js";
import "../imports/api/chats/ChatMessages.js";
import { WebApp } from 'meteor/webapp';
//Me parece muy ben que hallan añadido el meta tag de lang. Esto ayuda a solucionar problemas de accesibilidad.
WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));
