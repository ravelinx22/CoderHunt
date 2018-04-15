import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/EnterForm.css";
import { Accounts  } from 'meteor/accounts-base'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class EnterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signUpMode: false,
		}
	}

	componentDidMount() {
	}

	changeLog(e) {
		e.preventDefault();

		this.setState({
			signUpMode: !this.state.signUpMode,
		});
	}

	signUpWithPassword(e) {
		e.preventDefault();
		Accounts.createUser({
			username: this.refs.sign_username.value,
			name: this.refs.sign_username.value,
			email: this.refs.sign_email.value,
			password: this.refs.sign_password.value,
			isLoginWithPassword: true
		}, (error) => {
			if(error) {
				console.log(error);
				Alert.error(error.reason, {
					position: 'top-right',
					effect: 'jelly',
					timeout: 2000,
				});

			} else {
				this.props.onLogin();
			}
		});
	}

	enterWithPassword(e) {
		e.preventDefault();
		Meteor.loginWithPassword(this.refs.log_username.value, this.refs.log_password.value , (error) => {
			if(error) {
				console.log(error);
				Alert.error(error.reason, {
					position: 'top-right',
					effect: 'jelly',
					timeout: 2000,
				});

			} else {
				this.props.onLogin();
			}
		});
	} 

	enterWithGithub(e) {
		e.preventDefault();
		Meteor.loginWithGithub({
			requestPermissions: ['user', 'repo']

		}, (error) => {
			if(error) {
				console.log(error);
				Alert.error(error.reason, {
					position: 'top-right',
					effect: 'jelly',
					timeout: 2000,
				});

			} else {
				this.props.onLogin();
			}
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
					<input type="text" placeholder="Username" ref="sign_username" className="enter_input"/>
					<input type="email" placeholder="Email" ref="sign_email" className="enter_input"/>
					<input type="password" placeholder="Password" ref="sign_password" className="enter_input"/>
					<button className="enter_submit" onClick={this.signUpWithPassword.bind(this)}>Sign Up</button>
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
					<input type="text" placeholder="Username" ref="log_username" className="enter_input"/>
					<input type="password" placeholder="Password" ref="log_password" className="enter_input"/>
					<button className="enter_submit" onClick={this.enterWithPassword.bind(this)}>Log In</button>
				</form>
			);
		}
	}

	render() {
		return(
			<Row className="enter_form justify-content-center">
				<div className="enter_form_title">CoderHunt</div>
				{this.renderForm()}
			</Row>
		);
	}
}
