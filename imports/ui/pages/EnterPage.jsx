import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/EnterPage.css";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import EnterForm from "../components/EnterForm.jsx";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
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
						<div className="landing_info">
							<div className="enter_image_title">Start Swiping</div>
							<div className="enter_image_subtitle">Find programmers for your projects. Find projects for your portafolio.</div>
							<img src="/images/home.png" alt="enter_page_photo"/>
					</div></Row>
				</Col>
				<Col className="enter_side d-flex align-items-center" md={5} sm={12}>
					<EnterForm onLogin={this.props.onLogin} /> 
				</Col>
			</div>
		);
	}
}

export default withRouter(EnterPage);
