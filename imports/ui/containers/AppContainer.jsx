import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import UserMenu from "../components/UserMenu.jsx";
import ChatList from "../components/ChatList.jsx";
import EnterPage from "../pages/EnterPage.jsx";

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true,
		};
	}

	componentDidMount() {
	}

	render() {
		return(
			<Container>
				{ !this.state.loggedIn ? 
						<Row className="content-row">
							<EnterPage />
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
