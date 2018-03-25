import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatList.css";
import ChatItem from "./ChatItem.jsx";

export default class ChatList extends Component {
	constructor(props) {
		super(props);
	}

	renderChats() {
		let chats = [
			{	
				_id: "124j214kjh214kjh"
			},
			{
				_id: "124124kjhkjh142"
			}, 
			{
				_id: "21421424h12k4jhkj"
			}
		];
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
