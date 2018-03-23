import React, { Component } from "react";
import Hammer from "react-hammerjs";
import "../css/card.css";
import CardFlag from "./CardFlag.jsx"
import { Container as Grid, Row, Col, Button } from "reactstrap";

export default class Card extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			classList: ["tinder--card"],
			flags: ["Java", "Ruby", "Swift"]
		}
	}

	componentDidMount() {
	}

	renderFlags() {
		return this.state.flags.map((flag) => {
			return(
				<Col key={flag} md={3}>
					<CardFlag key={flag} name={flag} />
				</Col>);
		});
	}

	onPan(event) {
		this.state.classList.push('moving');
		if (event.deltaX === 0) return;
		if (event.center.x === 0 && event.center.y === 0) return;


		var xMulti = event.deltaX * 0.03;
		var yMulti = event.deltaY / 80;
		var rotate = xMulti * yMulti;

		event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
	}

	onPanEnd(event) {
		var newClass = this.state.classList.filter(s => s !== 'moving');
		this.setState({classList: newClass});

		var moveOutWidth = document.body.clientWidth;
		var keep = Math.abs(event.deltaX) < 300;
		event.target.classList.toggle('removed', !keep);
		if (keep) {
			event.target.style.transform = '';
		} else {
			var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
			var toX = event.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.velocityY) * moveOutWidth;
			var toY = event.deltaY > 0 ? endY : -endY;
			var xMulti = event.deltaX * 0.03;
			var yMulti = event.deltaY / 80;
			var rotate = xMulti * yMulti;

			event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
			this.onSwipe(toX, toY);
		}
	}

	onSwipe(posX, posY) {
		this.props.onSwipe();
		if(posX < 0) {
			this.props.onSwipeLeft(this.props.card);
		} else {
			this.props.onSwipeRight(this.props.card);
		}
	}

	render() {
		return(
			<Hammer onPan={this.onPan.bind(this)} onPanEnd={this.onPanEnd.bind(this)}>
				<div className={this.state.classList.join(" ")}>
					<img src={this.props.card.image_url} />
					<Grid className="card_info">
						<div className="card_name">{this.props.card.name}</div>
						<div className="card_username">Ravelinx22</div>
						<div className="card_description">This is a demo for Tinder like swipe cards</div>
						<Row>
							{this.renderFlags()}
						</Row>
					</Grid>
				</div>
			</Hammer>
		);
	}
}
