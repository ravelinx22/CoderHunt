import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/CardDetailPage.css";
import { detail_card, repos } from "../testdata.jsx";
import CardFlag from "../util/CardFlag.jsx";
import RepoItem from "../components/RepoItem.jsx";

export default class CardDetailPage extends Component {
	constructor(props) {
		super(props);
		var data = detail_card();
		var repositories = repos();
		this.state = {
			data: data,
			repos: repositories
		};
	}

	componentDidMount() {
	}

	renderFlags() {
		return(
			<Col key="1" md={2}>
				<CardFlag key="1" name="buenas" />
			</Col>
		);
	}

	renderRepos() {
		return this.state.repos.map((repo) => {
			return(	
				<Col key={repo._id} md={6}>
					<RepoItem key={repo._id} url={repo.url} name={repo.name} description={repo.description} language={repo.language} />
				</Col>
			);
		});
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
					<Row>{this.renderRepos()}</Row>
				</div>
			</div>
		);
	}
}
