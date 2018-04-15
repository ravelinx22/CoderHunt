import React, { Component } from "react";
import "../../css/ChatNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Chats } from "../../../api/chats/Chats.js";
import Modal from 'react-responsive-modal';
import Rating from "react-rating";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class ChatNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			rating: 3,
			rated: false,
		}
	}

	componentDidMount() {
		if(!this.props.chat) {
			this.props.history.push("/");
			return;
		}
		this.validateRated();
	}

	componentDidUpdate() {
		console.log("entro");
		if(!this.props.chat) {
			this.props.history.push("/");
		}
		this.validateRated();
	}

	validateRated() {
		var that = this;
		if(this.props.isUserMode) {
			Meteor.call("users.ratedBefore", this.props.chat.projectId, function(err, result) {
				if(that.state.rated !== result) {
					that.setState({
						rated: result,
					});
				}
			});
		} else {
			const x = Meteor.call("users.ratedBefore", this.props.chat.userId, function(err, result) {
				if(that.state.rated !== result) {
					that.setState({
						rated: result,
					});
				}

			});
		}

	}

	goBack() {
		this.props.history.goBack();	
	}

	removeChat() {
		if(!this.state.rated) {
		Alert.error('You can\'t delete chat without rating first', {
			position: 'top-right',
			effect: 'jelly',
			timeout: 2000,
		});

		} else {
			Meteor.call("chats.remove", this.props.chatId);
			this.props.history.push("/");
		}
	}

	rateChat() {	
		if(this.props.isUserMode) {
			Meteor.call("users.rateProject", this.props.chat.projectId, this.state.rating);
			this.onCloseModal();
		} else {
			Meteor.call("users.rateUser", this.props.chat.userId, this.state.rating);
			this.onCloseModal();
		}
	}

	renderName() {
		if(this.props.chat) {
			return ( this.props.isUserMode ? this.props.chat.projectOwnerName : this.props.chat.userName );
		} else {
			return "Chat"
		}
	}

	onOpenModal() {
		this.setState({ open: true  });	  
	};

	onCloseModal() {
		this.setState({ open: false  }); 
	};

	onChangeRating(value) {
		this.setState({
			rating: value,
		})
	}

	renderRating() {
		if(this.state.rated) {
			return null;
		}

		return(
			<button className="btn_rate_chat ml-auto" onClick={this.onOpenModal.bind(this)}>Rate</button>
		);
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
					<Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} little>
						<div className="rating_title">Rate {this.props.isUserMode ? "project" : this.renderName()}</div>
						<Row className="rating_stars justify-content-center">
							<Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={this.state.rating} onChange={this.onChangeRating.bind(this)} />
						</Row>
						<Row className="justify-content-center">
							<button className="modal_rate" onClick={this.rateChat.bind(this)}>Rate</button>
						</Row>
					</Modal>
					{this.renderRating()}
					<button className={"btn_remove_chat " +(this.state.rated ? "ml-auto" : "") } onClick={this.removeChat.bind(this)}>Delete</button>
				</Row>
			</Container>
		);
	}
}

export default withTracker((props) => {
	return {
		chat: Chats.findOne({_id: props.chatId}), 
	}
})(ChatNavbar);
