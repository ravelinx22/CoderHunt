import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";
import ProjectsNavbar from "../components/navbars/ProjectsNavbar.jsx";

export default class ProjectsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {

		return(
			<div className="swipe_content">
				<ProjectsNavbar history={this.props.history} />
				<Cards history={this.props.history} isUserMode={this.props.isUserMode} projectViewMode={true} /> 
			</div>
		);
	}
}
