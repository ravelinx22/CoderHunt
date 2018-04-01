import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/EnterPage.css";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class EnterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	enterPage() {
		Meteor.loginWithGithub({
			requestPermissions: ['user', 'repo']
		}, (error) => {
			if (error) {
				console.log(error);
			}
			this.props.onLogin();
		});
	}

	render() {
		return(
			<div className="enter_content">
				<Col className="enter_side d-flex align-items-center" md={5} sm={12}>
					<Container>
						<Row className="enter_title justify-content-center">CoderHunt</Row>
						<Row className="github_row justify-content-center">		
							<button className="enter_github" onClick={this.enterPage.bind(this)}>
								<i className="fa fa-github"></i>
								Enter with Github</button>
						</Row>
						<Row className="enter_policy justify-content-center">
							By clicking I Accept, you confirm that you have read the terms and conditions, that you
							understand them and that you agree to be bound by them.
						</Row>
					</Container>
				</Col>
				<Col className="image_side"  md={7} sm={12}>
					<Row className="image_row justify-content-center d-flex align-items-center">
						<img src="/images/test_photo.png" alt="enter_page_photo"/>
					</Row>
				</Col>
			</div>
		);
	}
}

export default withRouter(EnterPage);
