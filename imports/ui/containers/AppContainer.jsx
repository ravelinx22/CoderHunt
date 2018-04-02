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

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: (Meteor.userId() !== null),
			isUserMode: true,
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

	render() {
		return (
			<Container>
				{!this.state.logged ?
					<Row className="content-row">
						<EnterPage onLogin={this.onLogin.bind(this)} />
					</Row>
					:
					<Row className="content-row">
						<Col className="left_content" md={4}>
							<UserMenu onLogout={this.onLogout.bind(this)} />
							<ChatList isUserMode={this.state.isUserMode} />
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
			</Container>
		);
	}
}
