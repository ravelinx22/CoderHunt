import React, { Component } from "react";
import Card from "./Card.jsx";
import LookingCard from "./LookingCard.jsx";
import "../css/cards.css";
import { Container, Row, Col, Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Projects } from "../../api/projects/Projects.js";
import { Likes } from "../../api/likes/Likes";
import { usersForProject } from "../../api/users/Users";
import { projectsForUser } from "../../api/projects/Projects";

class Cards extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
		this.setupCards();
	}

	componentDidUpdate() {
		this.setupCards();
	}

	renderCards() {
		return this.props.data.map((card) => {
			return <Card key={card._id}  onSwipe={this.setupCards} card={card} onSwipeLeft={this.onSwipeLeft.bind(this)} onSwipeRight={this.onSwipeRight.bind(this)} onDoubleTap={this.onDoubleTap.bind(this)} />
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
		if(this.props.projectViewMode) {
			this.shift();
		}
		console.log("Left " + card._id);
	}

	onSwipeRight(card) {
		if(this.props.projectViewMode) {
			this.shift();
		} else {
			var body = {};

			if (this.props.isUserMode) {
				body["userId"] = this.props.userId;
				body["projectId"] = card._id;
				body["projectOwnerId"] = card.userId
			} else {
				body["userId"] = card._id; 
				body["projectOwnerId"] = this.props.userId; 
			}

			body["comingFromUser"] = this.props.isUserMode;
			Meteor.call("likes.insert", body);
		}
	}

	onDoubleTap(card) {
		if(this.props.isUserMode) {
			this.props.history.push("/project/" + card._id);
		} else {
			this.props.history.push("/user/" + card._id);
		}
	}

	likeCard(event) {
		var cards = document.querySelectorAll('.tinder--card:not(.removed):not(.looking--card)');
		var moveOutWidth = document.body.clientWidth * 1.5;
		if (!cards.length) return false;
		var card = cards[0];
		card.classList.add('removed');
		card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

		if(this.props.projectViewMode) {
			this.shift();
		} else  {
			const index = this.indexOfLastLike();
			this.onSwipeRight(this.props.data[index]);
			this.setupCards();
		}

		event.preventDefault();
	}

	indexOfLastLike() {
		const cards = document.querySelectorAll(".tinder--card");
		var i = 0;
		for(i = 0; i < cards.length; i++) {
			if(!cards[i].className.includes("removed")) {
				break;
			}
		}

		return (i < cards.length ? i : -1);
	}

	unlikeCard(event) {
		var cards = document.querySelectorAll('.tinder--card:not(.removed):not(.looking--card)');
		var moveOutWidth = document.body.clientWidth * 1.5;
		if (!cards.length) return false;
		var card = cards[0];
		card.classList.add('removed');
		card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';

		if(this.props.projectViewMode) {
			this.shift();
		} else {
			this.setupCards();
		}

		event.preventDefault();
	}

	shift() {
		var tinderContainer = document.querySelector('.tinder');
		var allCards = document.querySelectorAll('.tinder--card');

		var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
		if(newCards.length <= 0) {
			var removedClass = document.querySelectorAll(".removed");
			removedClass.forEach((card,index) => {
				card.classList.remove("removed");
			});
		}
		newCards = document.querySelectorAll('.tinder--card:not(.removed)');
		newCards.forEach(function (card, index) {
			card.style.zIndex = allCards.length - index;
			card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
			card.style.opacity = (10 - index) / 10;
		});
		tinderContainer.classList.add('loaded');
	}

	render() {
		return (
			<div className="tinder">
				<div className="tinder--cards">
					{this.renderCards()}
					{ this.props.projectViewMode ? null : <LookingCard /> }
				</div>
				<div className="card-buttons">
					<button className="unlike" onClick={this.unlikeCard.bind(this)} aria-label="Unlike card button">
						<i className="fa fa-thumbs-down"></i>
					</button>
					<button className="like" onClick={this.likeCard.bind(this)} aria-label="Like card button">
						<i className="fa fa-thumbs-up"></i>
					</button>
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("users");
	Meteor.subscribe("likes");
	Meteor.subscribe('projects');

	return {
		isUserMode: props.isUserMode,
		userId: Meteor.userId(),
		data: (props.projectViewMode ? Projects.find({userId: Meteor.userId()}).fetch() : (props.isUserMode ? projectsForUser().fetch() : usersForProject().fetch()))
	};
})(Cards)
