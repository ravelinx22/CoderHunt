import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatPage.css";
import ChatMessage from "../components/ChatMessage.jsx";
import ReactDOM from 'react-dom';
import ChatNavbar from "../components/navbars/ChatNavbar.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ChatMessages } from "../../api/chats/ChatMessages.js";

class ChatPage extends Component {
	constructor(props) {
		super(props);
	}

	renderMessages() {
		return this.props.messages.map((chat) => {
			return <ChatMessage chat={chat} key={chat._id} />;
		});
	}

	submitMessage(e) {
		(new Audio('/sounds/message_send.mp3')).play();
		e.preventDefault();

		Meteor.call("chatmessages.insert", {
			senderId: this.props.userId,
			message: this.refs.msg.value,
			chatId: this.props.match.params.id,
		});
		ReactDOM.findDOMNode(this.refs.msg).value = "";
	}

	componentDidMount() {
		this.scrollToBot();
	}

	componentDidUpdate() {
		this.scrollToBot();
	}

	scrollToBot() {
		ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
	}

	render() {
		return (
			<div className="chats">
				<ChatNavbar history={this.props.history} chatId={this.props.match.params.id} isUserMode={this.props.isUserMode} />
				<div className="chat-content" ref="chats">
					<ul>
						{this.renderMessages()}
					</ul>
				</div>
				<form className="chat_form" onSubmit={(e) => this.submitMessage(e)}>
					<input type="text" ref="msg" placeholder="Type a message" aria-label="Message text field" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("chatmessages");
	return {
		userId: Meteor.userId(),
		messages: ChatMessages.find({ chatId: props.match.params.id }).fetch(),
	};
})(ChatPage);
