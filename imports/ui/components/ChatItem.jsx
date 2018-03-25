import React, { Component } from "react";
import "../css/ChatItem.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";

export default class ChatItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {  
		return(
			<Link to={"/chat/" + this.props.chat._id}  className="row chat_item">
				<img src="https://avatars3.githubusercontent.com/u/16025512?s=460&v=4" alt="user_img" className="rounded-circle chat_item_img"/>
				<div className="chat_item_info">
					<div className="chat_item_info_row chat_item_info_name">
						Nicolás
					</div>
					<div className="chat_item_info_row chat_item_info_message">
						flkjasflkjasflkajsfklj
					</div>
				</div>
				<div className="chat_item_new">
					<div className="chat_item_flag">
						1
					</div>
				</div>
			</Link>
		);
	}
}
