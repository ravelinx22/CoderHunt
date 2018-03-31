import React, { Component } from "react";
import "../css/ChatItem.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ChatMessages } from "../../api/chats/ChatMessages.js";

class ChatItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	getName() {
		if(this.props.receiverUser.name) {
			return this.props.receiverUser.name.replace(/ .*/,'');
		} 
		return this.props.receiverUser.services.github.username;
	}

	renderLastMessage() {
		if(this.props.lastMessage.length > 0) {
			return this.props.lastMessage[0].message;
		} else {
			return "Be the first to message";
		}
	}

	render() {  
		if(!this.props.receiverUser || (this.props.receiverUser && this.props.receiverUser._id === Meteor.userId())) {
			return null;
		}

		return(
			<Link to={"/chat/" + this.props.chat._id}  className="row chat_item unselectable">
				<img src={this.props.receiverUser.image_url} alt="user_img" className="rounded-circle chat_item_img"/>
				<div className="chat_item_info">
					<div className="chat_item_info_row chat_item_info_name">
						{this.getName()}
					</div>
					<div className="chat_item_info_row chat_item_info_message">
						{this.renderLastMessage()}						
					</div>
				</div>
				<div className="chat_item_new">
					<div className={"chat_item_flag " + (this.props.unReadMessages.length > 0 ? "" : "hidden")}>
						{this.props.unReadMessages.length}
					</div>
				</div>
			</Link>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("users");
	Meteor.subscribe("chatmessages");
	return {
		receiverUser: (props.isUserMode ? Meteor.users.findOne({_id: props.chat.projectOwnerId}) : Meteor.users.findOne({_id: props.chat.userId})),
		lastMessage: ChatMessages.find({chatId: props.chat._id},{sort: {createdAt: -1}, limit: 1}).fetch(),
		unReadMessages: ChatMessages.find({chatId: props.chat._id, isSeen: false, senderId: {$ne: Meteor.userId()}}).fetch(),
	};
})(ChatItem);
