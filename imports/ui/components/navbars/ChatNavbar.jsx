import React, { Component } from "react";
import "../../css/ChatNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Chats } from "../../../api/chats/Chats.js";

class ChatNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		if(!this.props.chat) {
			this.props.history.push("/");
		}
	}

	componentDidUpdate() {
		if(!this.props.chat) {
			this.props.history.push("/");
		}
	}

	goBack() {
		this.props.history.goBack();	
	}

	removeChat() {
		Meteor.call("chats.remove", this.props.chatId);
	}

	rateChat() {
		if(this.props.isUserMode) {
			Meteor.call("users.rateProject", this.props.chat.projectId, 1);
		} else {
			Meteor.call("users.rateUser", this.props.chat.userId, 4);
		}
	}

	renderName() {
		if(this.props.chat) {
			return ( this.props.isUserMode ? this.props.chat.projectOwnerName : this.props.chat.userName );
		} else {
			return "Chat"
		}
	}


	render() {  
		return(
			<Container className="chat_navbar d-flex align-items-center">
				<Row className="chat_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="chat_title">{this.renderName()}</div>
					<button className="btn_rate_chat ml-auto" onClick={this.rateChat.bind(this)}>Rate</button>
					<button className="btn_remove_chat" onClick={this.removeChat.bind(this)}>Delete</button>
				</Row>
			</Container>
		);
	}
}

export default withTracker((props) => {
	return {
		chat: Chats.findOne({_id: props.chatId}), 
	}
})(ChatNavbar);
