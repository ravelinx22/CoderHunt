import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/CardDetailPage.css";
import { detail_card } from "../testdata.jsx";
import CardFlag from "../util/CardFlag.jsx";

export default class CardDetailPage extends Component {
	constructor(props) {
		super(props);
		var data = detail_card();
		this.state = {
			data: data
		};
	}

	componentDidMount() {
	}

	renderFlags() {
		return(
			<Col key="1" md={3}>
				<CardFlag key="1" name="buenas" />
			</Col>
		);
	}

	render() {
		return(
			<div className="data_detail">
				<img src={this.state.data.image_url} alt="data_pic" className="detail_img"/>
				<div className="info_container">
					<div className="detail_name">William</div>
					<div className="detail_username">ravelinx22</div>
				</div>
				<div className="info_container">
					<div className="info_title">Bio</div>
					<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
				</div>
				<div className="info_container">
					<div className="info_title">Tags</div>
					<Row>
						{this.renderFlags()}
					</Row>
				</div>
		        <div className="info_container">
					<div className="info_title">Repos</div>

				</div>
			</div>
		);
	}
}
