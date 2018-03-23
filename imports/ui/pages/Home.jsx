import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					name: "William",
					username: "Ravelinx22",
					email: "asfasf",
					languages: ["Java"],
					image_url: "https://avatars3.githubusercontent.com/u/16025512?s=460&v=4"
				}
			]
		}
	}

	componentDidMount() {
	}

	render() {

		return(
			<h1>Home</h1>
		);
	}
}
