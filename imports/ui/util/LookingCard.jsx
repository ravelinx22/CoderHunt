import "../css/LookingCard.css";
import { Container as Grid, Row, Col, Button } from "reactstrap";
import React, { Component } from "react";
import { BounceLoader } from 'react-spinners';

export default class LookingCard extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="tinder--card looking--card">
				{ !this.props.emptyProjects ?
						<div className="spinner">
							<BounceLoader color={'#193441'} loading={true} className="spinner" />
						</div> : null }
						<img className="looking_card_img rounded-circle" src="https://avatars3.githubusercontent.com/u/16025512?s=400&u=e168efefc0d0ff59458573703d521b47b5e82fa0&v=4" alt="looking card" />
						<div className="looking_card_title">{this.props.emptyProjects ? "You don't have proyects yet" : "Searching for results..."}</div>
					</div>
		);
	}
}
