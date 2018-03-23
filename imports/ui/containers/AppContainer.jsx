import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

// Erase
import ChatItem from "../components/ChatItem.jsx";

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}

	render() {
		return(
			<Container>
				{ this.state.loggedIn ? 
						<Row>
							<h1>Hello World</h1>
						</Row>
						:
						<Row>
							<Col md={4}> 
								<h1>Chat</h1>
								<ChatItem/>
							</Col>
							<Col md={8}>
								{this.props.children}
							</Col>
						</Row>
				}
			</Container>
		);
	}
}
