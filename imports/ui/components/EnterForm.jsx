import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/EnterForm.css";

export default class EnterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signUpMode: false,
		}
	}

	componentDidMount() {
	}

	onSubmit(e) {
		e.preventDefault();
		alert("hola");
	}

	changeLog(e) {
		e.preventDefault();

		this.setState({
			signUpMode: !this.state.signUpMode,
		});
	}


	enterWithGithub(e) {
		e.preventDefault();
		console.log("buenas");
		Meteor.loginWithGithub({
			requestPermissions: ['user', 'repo']

		}, (error) => {
			if (error) {
				console.log(error);
			}
			this.props.onLogin();
		});
	}

	renderForm() {
		if(this.state.signUpMode) {
			return(			
				<form>
					<div className="change_log">
						<button className="change_log_login" onClick={this.changeLog.bind(this)}>
							Log In							
						</button>
						<button className="change_log_sign change_active" onClick={this.changeLog.bind(this)}>
							Sign Up
						</button>
					</div>
					<Row className="github_row justify-content-center">
						<button className="enter_github" onClick={this.enterWithGithub.bind(this)}> <i className="fa fa-github"></i> Enter with Github</button>
					</Row>
					<div className="enter_option_title">Or, sign up with email</div>
					<input type="text" placeholder="Name" className="enter_input"/>
					<input type="email" placeholder="Email" className="enter_input"/>
					<input type="password" placeholder="Password" className="enter_input"/>

					<button className="enter_submit" onClick={this.onSubmit.bind(this)}>Sign Up</button>
				</form>
			);
		} else {
			return(
				<form>
					<div className="change_log">
						<button className="change_log_login change_active" onClick={this.changeLog.bind(this)}>
							Log In							
						</button>
						<button className="change_log_sign" onClick={this.changeLog.bind(this)}>
							Sign Up
						</button>
						<Row className="github_row justify-content-center">
							<button className="enter_github" onClick={this.enterWithGithub.bind(this)}> <i className="fa fa-github"></i> Enter with Github</button>
						</Row>
						<div className="enter_option_title">Or, log in with email</div>
					</div>
					<input type="email" placeholder="Email" className="enter_input"/>
					<input type="password" placeholder="Password" className="enter_input"/>
					<button className="enter_submit" onClick={this.onSubmit.bind(this)}>Log In</button>
				</form>
			);
		}
	}

	render() {
		return(
			<Row className="enter_form justify-content-center">
				{this.renderForm()}
			</Row>
		);
	}
}
