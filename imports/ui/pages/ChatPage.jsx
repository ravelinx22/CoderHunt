import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatPage.css";
import ChatMessage from "../components/ChatMessage.jsx";
import ReactDOM from 'react-dom';
import { chats } from "../testdata.jsx";

export default class ChatPage extends Component {
	constructor(props) {
		super(props);
		var data = chats();
		this.state = {
			lastId: 1,
			data: data		
		};
	}

	renderMessages() {
		return this.state.data.map((chat) => {
			return <ChatMessage chat={chat} key={chat._id}/>;
		});
	}

	submitMessage(e) {
		e.preventDefault();

		this.setState({
			data: this.state.data.concat([{
				_id: this.state.lastId,
				username: "ravelinx22",
				content: ReactDOM.findDOMNode(this.refs.msg).value,
				profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
			}]),
			lastId: this.state.lastId+1,
		}, () => {
			ReactDOM.findDOMNode(this.refs.msg).value = "";
		});
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
