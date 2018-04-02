import React, { Component } from "react";
import "../../css/ProjectsNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export default class ProjectsNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	goBack() {
		this.props.history.goBack();	
	}

	render() {  
		return(
			<Container className="chat_navbar d-flex align-items-center">
				<Row className="chat_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="chat_title mr-auto">My Projects</div>
				</Row>
			</Container>
		);
	}
}
