import React, { Component } from "react";
import "../../css/NewProjectNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";

export default class NewProjectNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	goBack() {
		this.props.history.goBack();	
	}

	removeProject() {

	}

	render() {  
		return(
			<Container className="new_project_navbar d-flex align-items-center">
				<Row className="new_project_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="new_project_title">Create Project</div>
					<a className="btn_remove_project ml-auto" onClick={this.removeProject.bind(this)}>
						<i className="fa fa-trash"></i>
					</a>
				</Row>
			</Container>
		);
	}
}
