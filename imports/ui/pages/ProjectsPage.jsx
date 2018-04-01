import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";
import HomeNavbar from "../components/navbars/HomeNavbar.jsx";

export default class ProjectsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		return(
			<div className="swipe_content">
				<Cards history={this.props.history} isUserMode={this.props.isUserMode} projectViewMode={true} /> 
			</div>
		);
	}
}
