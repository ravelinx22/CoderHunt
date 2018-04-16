import React, { Component } from "react";
import "../../css/CardNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { Meteor } from "meteor/meteor";

export default class CardNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
	}

	goBack() {
		this.props.history.goBack();
	}

	like() {
		if (this.props.projectViewMode) {
			this.shift();
		} else {
			var body = {};

			if (this.props.isUserMode) {
				body["userId"] = Meteor.userId();
				body["projectId"] = this.props.card._id;
				body["projectName"] = this.props.card.name;
				body["projectOwnerId"] = this.props.card.userId
			} else {
				body["userId"] = this.props.card._id;
				body["projectOwnerId"] = Meteor.userId();
			}
			body["dislike"] = false;
			body["comingFromUser"] = this.props.isUserMode;

			Meteor.call("likes.insert", body);
			this.props.history.push("/");

			if (!this.props.isUserMode)
				Meteor.call("users.updateLikeStats", body.userId);
		}
	}

	unlike() {
		if (this.props.projectViewMode) {
			this.shift();
		} else {
			var body = {};
			if (this.props.isUserMode) {
				body["userId"] = Meteor.userId();
				body["projectId"] = this.props.card._id;
				body["projectName"] = this.props.card.name;
				body["projectOwnerId"] = this.props.card.userId
			} else {
				body["userId"] = this.props.card._id;
				body["projectOwnerId"] = Meteor.userId();
			}
			console.log(this.props.card);
			body["dislike"] = true;
			body["comingFromUser"] = this.props.isUserMode;

			Meteor.call("likes.insert", body);
			this.props.history.push("/");
		}
	}

	render() {
		return (
			<Container className="card_navbar d-flex align-items-center">
				<Row className="card_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="card_title">Profile</div>
					<div className="ml-auto detail_card_buttons">
						<button className="unlike" onClick={this.unlike.bind(this)} aria-label="Unlike card button">
							<i className="fa fa-thumbs-down"></i>
						</button>
						<button className="like" onClick={this.like.bind(this)} aria-label="Like card button">
							<i className="fa fa-thumbs-up"></i>
						</button>

					</div>
				</Row>
			</Container>
		);
	}
}
