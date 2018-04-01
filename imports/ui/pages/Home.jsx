import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";
import HomeNavbar from "../components/navbars/HomeNavbar.jsx";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: (this.props.isUserMode ? "Project" : "Programmer"),
		}
	}

	componentDidMount() {
	}

	onToggle(event) {
		var newMode = !this.props.isUserMode;
		this.props.onChangeMode();
		this.setState({
			mode: (newMode ? "Project" : "Programmer"),
		});
	}

	render() {

		return(
			<div className="swipe_content">
				<HomeNavbar onToggle={this.onToggle.bind(this)} mode={this.state.mode} isUserMode={this.props.isUserMode} />
				<Cards history={this.props.history} isUserMode={this.props.isUserMode} projectViewMode={false} /> 
			</div>
		);
	}
}
