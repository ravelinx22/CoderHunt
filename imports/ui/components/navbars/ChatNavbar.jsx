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

	render() {  
		return(
			<div className="chat_navbar">Hola</div>
		);
	}
}
