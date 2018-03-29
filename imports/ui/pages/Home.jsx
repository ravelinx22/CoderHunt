import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";
import HomeNavbar from "../components/navbars/HomeNavbar.jsx";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserMode: true,
			mode: "Project",
		}
	}

	componentDidMount() {
	}

	onToggle(event) {
		var newUserMode = !this.state.isUserMode;
		this.setState({
			isUserMode: newUserMode,
			mode: (newUserMode ? "Project" : "Programmer" )
		});
	}

	render() {

		return(
			<div className="swipe_content">
				<HomeNavbar onToggle={this.onToggle.bind(this)} mode={this.state.mode} isUserMode={this.state.isUserMode} />
				<Cards history={this.props.history} isUserMode={this.state.isUserMode} /> 
			</div>
		);
	}
}
