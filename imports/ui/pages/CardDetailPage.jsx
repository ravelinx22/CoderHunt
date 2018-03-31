import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/CardDetailPage.css";
import { detail_card, repos } from "../testdata.jsx";
import CardFlag from "../util/CardFlag.jsx";
import RepoItem from "../components/RepoItem.jsx";
import CardNavbar from "../components/navbars/CardNavbar.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Projects } from "../../api/projects/Projects.js";

class CardDetailPage extends Component {
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

	componentDidUpdate() {
	}

	renderFlags() {
		return this.props.dat.tags.map((tag) => {
			return(<Col key={tag} md={2}>
				<CardFlag key={tag} name={tag} />
			</Col>);
		});
	}

	renderRepos() {
		return this.props.dat.repos.map((repo) => {
			return(	
				<Col key={repo.repoId} md={6}>
					<RepoItem key={repo.repoId} url={repo.url} name={repo.name} description={repo.description} language={repo.language} />
				</Col>
			);
		});
	}

	render() {
		if(!this.props.dat) {
			return null;
		}
		return(
			<div className="data_detail">
				<CardNavbar history={this.props.history} />
				<div className="data_content">
					<img src={this.props.dat.image_url} alt="data_pic" className="detail_img"/>
					<div className="info_container">
						<div className="detail_name">{this.props.dat.name}</div>
						<div className="detail_username">{!this.props.dat.username && this.props.dat.services ? this.props.dat.services.github.username : this.props.dat.username}</div>
					</div>
					{ this.props.dat.description ? 
					<div className="info_container">
						<div className="info_title">Bio</div>
						<div>{this.props.dat.description}</div>
					</div> : null }
					<div className="info_container">
						<div className="info_title">Tags</div>
						<Row>
							{this.renderFlags()}
						</Row>
					</div>
					{ this.props.dat.repos ?
					<div className="info_container">
						<div className="info_title">Repos</div>
						<Row>{this.renderRepos()}</Row>
					</div> : null }
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("users");
	Meteor.subscribe("projects");
	
	const cardId = props.match.params.id;
console.log(props);
	return {
		dat: (props.isUserMode ? Projects.findOne({_id: cardId}) : Meteor.users.findOne({_id: cardId}))
	};
})(CardDetailPage);
