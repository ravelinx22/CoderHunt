import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatList.css";
import ChatItem from "./ChatItem.jsx";
import { chats_preview } from "../testdata.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Chats } from "../../api/chats/Chats.js";

class ChatList extends Component {
	constructor(props) {
		super(props);
	}

	renderChats() {		
		return this.props.chats.map((chat) => {
			return <ChatItem key={chat._id} chat={chat} />;
		});
	}

	render() {
		return(
			<ul className="chat_list"> 
				{this.renderChats()}
			</ul>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("chats");
	return {
		chats: (props.isUserMode ? Chats.find({}).fetch() : []),	
	};
})(ChatList);
