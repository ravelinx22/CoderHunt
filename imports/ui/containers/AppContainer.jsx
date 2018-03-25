import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

// Erase
import ChatList from "../components/ChatList.jsx";

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
						<Row className="content-row">
							<Col md={4}> 
								<ChatList />
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
