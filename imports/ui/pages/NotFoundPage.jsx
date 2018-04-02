import React, { Component } from "react";
import Hammer from "react-hammerjs";
import Cards from "../util/Cards.jsx";
import "../css/NotFoundPage.css";

export default class NotFoundPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="not_found">
				<h1 className="not_found_title">404 Not Found</h1>
			</div>
		);
	}
}
