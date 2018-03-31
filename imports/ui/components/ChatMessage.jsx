import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatMessage.css";
import {Meteor} from "meteor/meteor";

export default class ChatMessage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(this.props.chat.senderId !== Meteor.userId() && !this.props.chat.isSeen) {
			Meteor.call("chatmessages.seen", this.props.chat._id); 
		}
	}

	render() {
		return(
			<li className={"chat " + (this.props.chat.senderId === Meteor.userId() ? "right" : "left")}>
				<img src={this.props.chat.image_url} alt="user_pic" />
				{this.props.chat.message}
			</li>
		);
	}
}
