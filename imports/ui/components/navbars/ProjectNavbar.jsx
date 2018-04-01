import React, { Component } from "react";
import "../../css/ChatNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Chats } from "../../../api/chats/Chats.js";

class ProjectNavbar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(!this.props.card) {
			this.props.history.push("/");
		}
	}

	componentDidUpdate() {
		if(!this.props.card) {
			this.props.history.push("/");
		}
	}

	goBack() {
		this.props.history.goBack();	
	}

	removeProject() {
		Meteor.call("projects.remove", this.props.card._id);
	}

	renderName() {
		if(this.props.card && this.props.card.name) {
			return this.props.card.name;
		} 
		return "Project";
	}

	render() {  
		return(
			<Container className="chat_navbar d-flex align-items-center">
				<Row className="chat_navbar_row">
					<a className="btn_go_back mr-auto" onClick={this.goBack.bind(this)}>
						<i className="fa fa-arrow-left"></i>
						Go Back
					</a>
					<div className="chat_title">{this.renderName()}</div>
					<a className="btn_remove_chat ml-auto" onClick={this.removeProject.bind(this)}>
						<i className="fa fa-trash"></i>
					</a>
				</Row>
			</Container>
		);
	}
}

export default withTracker((props) => {
	return {
		projectViewMode: true,
	}
})(ProjectNavbar);
