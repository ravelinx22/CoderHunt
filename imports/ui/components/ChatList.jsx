import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatList.css";
import ChatItem from "./ChatItem.jsx";

export default class ChatList extends Component {
	constructor(props) {
		super(props);
	}

	renderChats() {
		let chats = ["Chat1", "Chat2", "Chat3"];
		return chats.map((chat) => {
			return <ChatItem key={chat} />;
		});
	}

	render() {
		return(
			<Container className="chat_list">
				{this.renderChats()}
			</Container>
		);
	}
}
