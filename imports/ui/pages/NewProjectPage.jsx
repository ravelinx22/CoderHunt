import React, { Component } from "react";
import NewProjectNavbar from "../components/navbars/NewProjectNavbar.jsx";
import "../css/NewProjectPage.css";
import { Container, Row, Col, Button } from "reactstrap";
import { WithContext as ReactTags } from 'react-tag-input';

export default class NewProjectPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [{ text: "Thailand" }, { text: "India" }],
			suggestions: ['USA', 'Germany', 'Austria', 'Costa Rica', 'Sri Lanka', 'Thailand']
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
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

	handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: newTags });
	}


	render() {
		const { tags, suggestions } = this.state;

		return(
			<div className="create_project">
				<NewProjectNavbar history={this.props.history}/>
				<Container className="create_project_content">
					<div>
						<form>
							<label>
								Insert Photo
								<Row className="justify-content-center">
									<input type="file" accept="image/*"/>
								</Row>
							</label>
							<label>
								Name
								<input type="text"/>
							</label>
							<label>
								Description
								<textarea className="description"/>
								</label><label>
								<ReactTags tags={tags}
									suggestions={suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.handleAddition}/>
							</label>
							<Row className="submit_row justify-content-center">
								<input type="submit" value="Submit"/>
							</Row>
						</form>
					</div>
				</Container>
			</div>
		);
	}
}
