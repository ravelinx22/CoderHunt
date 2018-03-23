import React, { Component } from "react";
import { Row, Grid, Col } from 'react-bootstrap';

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
			<Grid>
				{ this.state.loggedIn ? 
						<div>Hello World</div>
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
			</Grid>
		);
	}
}
