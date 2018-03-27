import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { cards } from "../testdata.jsx";
import "../css/Home.css";
import Cards from "../util/Cards.jsx";
import HomeNavbar from "../components/navbars/HomeNavbar.jsx";

export default class Home extends Component {
	constructor(props) {
		super(props);
		var data = cards();
		this.state = {
			data: data
		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	render() {

		return(
			<div className="swipe_content">
				<HomeNavbar />
				<Cards data={this.state.data} history={this.props.history} />	
			</div>
		);
	}
}
