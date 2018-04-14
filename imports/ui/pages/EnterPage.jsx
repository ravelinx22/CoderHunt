import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/EnterPage.css";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import EnterForm from "../components/EnterForm.jsx";

class EnterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}


	render() {
		return(
			<div className="enter_content">
				<Col className="image_side"  md={7} sm={12}>
					<Row className="image_row justify-content-center d-flex align-items-center">
						<img src="/images/home.png" alt="enter_page_photo"/>
					</Row>
				</Col>
				<Col className="enter_side d-flex align-items-center" md={5} sm={12}>
					<EnterForm onLogin={this.props.onLogin} /> 
				</Col>
			</div>
		);
	}
}

export default withRouter(EnterPage);
