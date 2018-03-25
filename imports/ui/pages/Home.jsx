import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { cards } from "../testdata.jsx";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";

export default class Home extends Component {
	constructor(props) {
		super(props);
		var data = cards();
		this.state = {
			data: data
		}
	}

	componentDidMount() {
	}

	render() {

		return(
			<div className="swipe_content">
				<Cards data={this.state.data} history={this.props.history} />				
			</div>
		);
	}
}
