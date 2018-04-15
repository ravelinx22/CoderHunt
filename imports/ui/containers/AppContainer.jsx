import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import UserMenu from "../components/UserMenu.jsx";
import ChatList from "../components/ChatList.jsx";
import EnterPage from "../pages/EnterPage.jsx";
import { Meteor } from "meteor/meteor";
import NotFoundPage from "../../ui/pages/NotFoundPage.jsx";
import Home from "../../ui/pages/Home.jsx";
import ProjectsPage from "../../ui/pages/ProjectsPage.jsx";
import ChatPage from "../../ui/pages/ChatPage.jsx";
import CardDetailPage from "../../ui/pages/CardDetailPage.jsx";
import NewProjectPage from "../../ui/pages/NewProjectPage.jsx";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Projects } from "../../api/projects/Projects.js";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import { withRouter  } from "react-router-dom";
import { withTracker  } from "meteor/react-meteor-data";

class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: (Meteor.userId() !== null),
			isUserMode: true,
			openUserMenu: false,
		};
	}

	componentDidMount() {
	}

	onLogin() {
		this.setState({
			logged: (Meteor.userId() !== null)
		});
	}

	onChangeMode() {
		this.setState({
			isUserMode: !this.state.isUserMode,
		});
		this.props.history.push("/");
	}

	changeMode(state) {
		this.setState({
			isUserMode: state,
		})
	}

	onLogout() {
		this.setState({
			logged: false,
		});
	}

	onToggleUserMenu(state) {
		this.setState({
			openUserMenu: state,
		})
	}

	renderChangeModeBtn() {
		if(this.props.user && this.props.user.repos) {
			if(this.state.isUserMode) {

				return(
					<button className="btn_programmer_mode" onClick={this.onChangeMode.bind(this)}><i className="fa fa-code programmer_mode_icon"/> Look For Programmers</button>
				);
			} else {

				return(
					<button className="btn_project_mode" onClick={this.onChangeMode.bind(this)}><i className="fa fa-briefcase project_mode_icon"/> Look For Projects</button>
				);
			}

		} else {

		}
	}

	render() {
		return (
			<Container fluid={true}>
				{!this.state.logged ?
					<Row className="content-row">
						<EnterPage onLogin={this.onLogin.bind(this)} />
					</Row>
					:
					<Row className="content-row">
						<Col className="left_content" md={4}>
							<UserMenu onLogout={this.onLogout.bind(this)} onToggle={this.onToggleUserMenu.bind(this)} />
							<ChatList className={this.state.openUserMenu ? "chat_list_open" : ""} isUserMode={this.state.isUserMode} />
							{this.renderChangeModeBtn()}	
						</Col>
						<Col className="right_content" md={8}>
							<main>
								<Switch>
									<Route exact path="/" render={(history) => {
										return React.createElement(Home, { ...history, onChangeMode: this.onChangeMode.bind(this), isUserMode: this.state.isUserMode });
									}} />

								<Route path="/projects" render={(history) => {
									return React.createElement(ProjectsPage, { ...history, isUserMode: this.state.isUserMode });
								}} />

							<Route path="/chat/:id" render={(history) => {
								return React.createElement(ChatPage, { ...history, isUserMode: this.state.isUserMode });
							}} />
						<Route path="/user/:id" render={(history) => {
							return React.createElement(CardDetailPage, { ...history, isUserMode: false, changeMode: this.changeMode.bind(this) })
						}} />
					<Route path="/project/new" component={NewProjectPage} />
					<Route path="/project/:id" render={(history) => {
						return React.createElement(CardDetailPage, { ...history, isUserMode: true, changeMode: this.changeMode.bind(this) })
					}} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</main>
	</Col>
</Row>
				}
				<Alert stack={{limit: 3}} />
			</Container>
		);
	}
}

export default withRouter(
	withTracker((props) => {
		Meteor.subscribe("users");
		return {
			user: Meteor.users.findOne({_id: Meteor.userId()}),
		}
	})(AppContainer)
);
