import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import UserMenu from "../components/UserMenu.jsx";

// Erase
import ChatList from "../components/ChatList.jsx";

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}

	componentDidMount() {
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
							<Col className="left_content" md={4}> 
								<UserMenu/>
								<ChatList />
							</Col>
							<Col className="right_content" md={8}>
								{this.props.children}
							</Col>
						</Row>
				}
			</Container>
		);
	}
}
