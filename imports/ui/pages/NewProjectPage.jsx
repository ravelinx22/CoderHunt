import React, { Component } from "react";
import NewProjectNavbar from "../components/navbars/NewProjectNavbar.jsx";
import "../css/NewProjectPage.css";
import { Container, Row, Col, Button } from "reactstrap";
import { WithContext as ReactTags } from 'react-tag-input';
import { Meteor } from "meteor/meteor";

export default class NewProjectPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [{ text: "Programming" }],
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
	}

	componentDidMount() {
	}

	handleDelete(i) {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter((tag, index) => index !== i),
		});
	}

	handleAddition(tag) {
		let tags = this.state.tags;
		tags.push({
			text: tag
		});
		this.setState({tags: tags});
	}

	handleSubmit(e) {
		Meteor.call("projects.insert", {
			name: this.refs.name.value,
			description: this.refs.description.value,
			tags: this.getTags()
		});
	}

	getTags() {
		return this.state.tags.map((tag) => {
			return tag.text;
		});
	}

	render() {
		const { tags } = this.state;

		return(
			<div className="create_project">
				<NewProjectNavbar history={this.props.history}/>
				<Container className="create_project_content">
					<div>
						<form className="create_project_form">
							<label>
								Insert Photo
								<Row className="justify-content-center">
									<input type="file" accept="image/*"/>
								</Row>
							</label>
							<label>
								Name
								<input ref="name" type="text"/>
							</label>
							<label>
								Description
								<textarea ref="description" className="description"/>
								<ReactTags tags={tags}
									handleDelete={this.handleDelete}
									handleAddition={this.handleAddition}/>
							</label>
						</form>
						<Row className="submit_row justify-content-center">
							<button className="submit" onClick={this.handleSubmit.bind(this)}>Submit</button>
						</Row>
					</div>
				</Container>
			</div>
		);
	}
}
