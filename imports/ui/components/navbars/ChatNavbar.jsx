import React, { Component } from "react";
import "../../css/ChatNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";

export default class ChatNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	goBack() {
		this.props.history.goBack();	
	}

	removeChat() {

	}

	render() {  
		return(
			<Container className="chat_navbar d-flex align-items-center">
				<Row className="chat_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="chat_title">Nicolás</div>
					<a className="btn_remove_chat ml-auto" onClick={this.removeChat.bind(this)}>
						<i className="fa fa-trash"></i>
					</a>
				</Row>
			</Container>
		);
	}
}
