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
					<a className="btn_remove_chat ml-auto" onClick={this.removeChat.bind(this)}>
						<i className="fa fa-trash"></i>
					</a>
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
