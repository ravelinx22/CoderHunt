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

	like() {
		console.log("like");
	}

	unlike() {
		console.log("unlike");
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
					<div className="ml-auto detail_card_buttons">
						<button className="unlike" onClick={this.unlike.bind(this)}>
							<i className="fa fa-thumbs-down"></i>
						</button>
						<button className="like" onClick={this.like.bind(this)}>
							<i className="fa fa-thumbs-up"></i>
						</button>

					</div>
				</Row>
			</Container>
		);
	}
}
