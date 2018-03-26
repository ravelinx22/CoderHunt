import React, { Component } from "react";
import "../../css/HomeNavbar.css";
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap";
import ToggleSwitch from '@trendmicro/react-toggle-switch';

export default class HomeNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
			mode: "Programmer",
		};
	}

	componentDidMount() {
	}

	toggleSwitch(event) {
		this.setState({ 
			checked: !this.state.checked,
			mode: "Project"
		});
	}

	render() {  
		return(
			<Container className="home_navbar d-flex align-items-center">
				<Row className="home_navbar_row">
					<div className="home_navbar_title mr-auto">
						Start Swiping
					</div>
					<div className="ml-auto">
						<span className="switch_label">{this.state.mode} mode</span>
						<ToggleSwitch className="home_navbar_switch" checked={this.state.checked} onChange={this.toggleSwitch.bind(this)}/>
					</div>
				</Row>
			</Container>
		);
	}
}
