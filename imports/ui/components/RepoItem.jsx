import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/RepoItem.css";

export default class RepoItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return(
			<div className="repo_item" >
				<a className="repo_name" href={this.props.url} >{this.props.name}</a>
				<p className="repo_info">{this.props.description}</p>
				<p className="repo_lang">
					<span className="repo_lang_color"></span>
					{this.props.language}
				</p>
			</div>
		);
	}
}
