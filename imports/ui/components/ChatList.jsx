import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatList.css";
import ChatItem from "./ChatItem.jsx";
import { chats_preview } from "../testdata.jsx";

export default class ChatList extends Component {
	constructor(props) {
		super(props);
	}

	renderChats() {
		let chats = chats_preview();		
		return chats.map((chat) => {
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
