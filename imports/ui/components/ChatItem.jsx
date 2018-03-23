import React, { Component } from "react";
import { Row, Grid, Col } from 'react-bootstrap';
import "../css/ChatItem.css";
import { Link } from "react-router-dom"

export default class ChatItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Grid className="chat_item_container">
				<Row className="chat_item show-grid">
					<Col>
						<div className="chat_item_info">
							asfasf						
						</div>
					</Col>
					<Col>
						<div className="chat_item_info">
							afsf				
						</div>
					</Col>
				</Row>

			</Grid>
		);
	}
}
