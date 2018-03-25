import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatPage.css";
import ChatMessage from "../components/ChatMessage.jsx";
import ReactDOM from 'react-dom';

export default class ChatPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastId: 1,
			data: [
				{
					_id: "askfjaf786asf1",
					content: "afs faf afs sakljfas",
					username: "ravelinx22",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				},
				{
					_id: "askfjaf786asf2",
					content: "afs faf afs sakljfas",
					username: "ravelinx22",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				},
				{
					_id: "askfjaf786asf3",
					content: "afs faf afs sakljfas",
					username: "algo",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				},
				{
					_id: "askfjaf786asf4",
					content: "afs faf afs sakljfas",
					username: "ravelinx22",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				},
				{
					_id: "askfjaf786asf5",
					username: "algo",
					content: "afs faf afs sakljfas",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				},
				{
					_id: "askfjaf786asf6",
					content: "afs faf afs sakljfas",
					username: "algo",
					profile_pic: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				}
			]
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
