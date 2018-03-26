import React, { Component } from "react";
import "../../css/HomeNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";

export default class HomeNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {  
		return(
			<Container className="home_navbar d-flex align-items-center">
				<Row className="home_navbar_row">
					<div className="mr-auto">
						Go Back
					</div>
					<div className="ml-auto">
						aslkjsaf
					</div>
				</Row>
			</Container>
		);
	}
}
