import React, { Component } from "react";
import "../../css/CardNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";

export default class CardNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	goBack() {
		this.props.history.goBack();	
	}

	render() {  
		return(
			<Container className="card_navbar d-flex align-items-center">
				<Row className="card_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="card_title">Profile</div>
					<a className="btn_remove_chat ml-auto">
						<i className="fa fa-trash"></i>
					</a>

				</Row>
			</Container>
		);
	}
}
