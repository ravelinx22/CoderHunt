import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatMessage.css";

export default class ChatMessage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<li className={"chat " + (this.props.chat.username === "ravelinx22" ? "right" : "left")}>
				<img src={this.props.chat.profile_pic} alt="user_pic" />
				{this.props.chat.content}
			</li>
		);
	}
}
