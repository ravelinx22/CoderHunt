import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import UserMenu from "../components/UserMenu.jsx";
import ChatList from "../components/ChatList.jsx";
import EnterPage from "../pages/EnterPage.jsx";
import { Meteor } from "meteor/meteor";

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: (Meteor.user() !== null)
		};
	}

	componentDidMount() {
	}

	onLogin() {
		this.setState({
			logged: (Meteor.user() !== null)
		});
	}

	render() {
		return(
			<Container>
				{ !this.state.logged ? 
						<Row className="content-row">
							<EnterPage onLogin={this.onLogin.bind(this)}/>
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
