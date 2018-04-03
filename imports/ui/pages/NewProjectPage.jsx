import React, { Component } from "react";
import NewProjectNavbar from "../components/navbars/NewProjectNavbar.jsx";
import "../css/NewProjectPage.css";
import { Container, Row, Col, Button } from "reactstrap";
import { WithContext as ReactTags } from 'react-tag-input';
import { Meteor } from "meteor/meteor";
import Dropzone from 'react-dropzone'
import { Line } from 'rc-progress';
import { Tracker } from 'meteor/tracker';

export default class NewProjectPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [{ text: "Programming" }],
			files: [],
			progress: 0,
			disabled: false,
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
		//Me parece muy interesante que utilicen slingshot para subir fotos a Amazon S3. 
		var uploader = new Slingshot.Upload("projectPhotos");
		body =   {
			name: this.refs.name.value,
			description: this.refs.description.value,
			tags: this.getTags(),
		};
		//Es una muy buena adición que permitan a los usuarios subir fotos sobre los proyectos.
		const that = this;
		if(this.state.files.length <= 0)
			return null;

		this.setState({disabled: true});

		Tracker.autorun(function () {
			that.setState({progress: uploader.progress()*100});
		});

		uploader.send(this.state.files[0], function (error, downloadUrl) {
			if (error) {
				alert (error);
			}
			else {
				body["image_url"] = downloadUrl;
				Meteor.call("projects.insert",body);
				that.props.history.push("/");
			}
		});
	}

	getTags() {
		return this.state.tags.map((tag) => {
			return tag.text;
		});
	}

	onDrop(files) {
		this.setState({
			files
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
							</label>
							<span className="insert_photo">
								<Dropzone disabled={this.state.disabled} accept="image/*" onDrop={this.onDrop.bind(this)}>
									<p>{ this.state.files.length > 0 ? this.state.files[0].name  : "Try dropping some files here, or click to select files to upload."}</p>
								</Dropzone>
							</span>
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
						{!this.state.disabled ? 
								<Row className="submit_row justify-content-center">
									<button className="submit" onClick={this.handleSubmit.bind(this)}>Submit</button> 
								</Row> :
								<Line percent={this.state.progress} strokeWidth="2"/> }
							</div>
						</Container>
					</div>
		);
	}
}
