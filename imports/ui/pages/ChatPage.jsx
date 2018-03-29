import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatPage.css";
import ChatMessage from "../components/ChatMessage.jsx";
import ReactDOM from 'react-dom';
import { chats } from "../testdata.jsx";
import ChatNavbar from "../components/navbars/ChatNavbar.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ChatMessages } from "../../api/chats/ChatMessages.js";

class ChatPage extends Component {
	constructor(props) {
		super(props);
		var data = chats();
		this.state = {
			lastId: 1,
			data: data		
		};
	}

	renderMessages() {
		return this.props.messages.map((chat) => {
			return <ChatMessage chat={chat} key={chat._id}/>;
		});
	}

	submitMessage(e) {
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
		return(
			<div className="chats">
				<ChatNavbar history={this.props.history}/>
				<div className="chat-content" ref="chats"> 
					{this.renderMessages()}	
				</div>
				<form className="chat_form" onSubmit={(e) => this.submitMessage(e)}>
					<input type="text" ref="msg" placeholder="Type a message" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("chatmessages", props.match.params.id);
	return {
		userId: Meteor.userId(),
		messages: ChatMessages.find({}).fetch(),
	};
})(ChatPage);
