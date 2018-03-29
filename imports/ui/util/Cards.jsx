import React, { Component } from "react";
import Card from "./Card.jsx";
import "../css/cards.css";
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Projects } from "../../api/projects/Projects.js";

class Cards extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setupCards();	
	}

	componentDidUpdate() {
		this.setupCards();	
		console.log(this.props.posi);
	}

	renderCards() {
		return this.props.data.map((card) => {
			console.log(card);
			return <Card key={card._id} onSwipe={this.setupCards} card={card} onSwipeLeft={this.onSwipeLeft.bind(this)} onSwipeRight={this.onSwipeRight.bind(this)} onDoubleTap={this.onDoubleTap.bind(this)}/>
		});
	}

	setupCards() {
		var tinderContainer = document.querySelector('.tinder');
		var allCards = document.querySelectorAll('.tinder--card');

		var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

		newCards.forEach(function (card, index) {
			card.style.zIndex = allCards.length - index;
			card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
			card.style.opacity = (10 - index) / 10;
		});
		tinderContainer.classList.add('loaded');
	}

	onSwipeLeft(card) {
		console.log("Left " + card._id);
	}

	onSwipeRight(card) {
		console.log("Right " + card._id);
		Meteor.call("likes.insert", {
			userId: 2,
			projectId: 2,
			comingFromUser: false,
		});
	}

	onDoubleTap(card) {
		this.props.history.push("/user/" + card._id);
	}

	likeCard(event) {
		var cards = document.querySelectorAll('.tinder--card:not(.removed)');
		var moveOutWidth = document.body.clientWidth * 1.5;
		if (!cards.length) return false;
		var card = cards[0];
		card.classList.add('removed');
		card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
		this.setupCards();
		event.preventDefault();
	}

	unlikeCard(event) {
		var cards = document.querySelectorAll('.tinder--card:not(.removed)');
		var moveOutWidth = document.body.clientWidth * 1.5;
		if (!cards.length) return false;
		var card = cards[0];
		card.classList.add('removed');
		card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
		this.setupCards();
		event.preventDefault();
	}

	render() {
		return(
			<div className="tinder">
				<div className="tinder--cards">
					{this.renderCards()}
				</div>
				<div className="card-buttons">
					<button className="unlike" onClick={this.unlikeCard.bind(this)}>
						<i className="fa fa-thumbs-down"></i>
					</button>
					<button className="like" onClick={this.likeCard.bind(this)}>
						<i className="fa fa-thumbs-up"></i>
					</button>
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("projects");
	Meteor.subscribe("users");
	var x = Meteor.users.find({}).fetch();
	console.log(x);
	return {
		data: (props.isUserMode ? Projects.find({}).fetch():x ), 
	};
})(Cards)
