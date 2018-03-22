import React, { Component } from "react";
import "../css/card.css";

export default class CardFlag extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="card_flag">
				{this.props.name}
			</div>
		);
	}
}
