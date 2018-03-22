import React, { Component } from "react";
import Card from "./Card.jsx";
import "../css/cards.css";

export default class Cards extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.setupCards();
	}

	renderCards() {
		return this.props.data.map((card) => {
			return <Card key={card._id} onSwipe={this.setupCards} card={card} onSwipeLeft={this.onSwipeLeft.bind(this)} onSwipeRight={this.onSwipeRight.bind(this)} />
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
	}

	render() {
		return(
			<div className="tinder">
				<div className="tinder--cards">
					{this.renderCards()}
				</div>
			</div>
		);
	}
}
