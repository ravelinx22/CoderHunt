import React, { Component } from "react";
import NewProjectNavbar from "../components/navbars/NewProjectNavbar.jsx";
import "../css/NewProjectPage.css";
import { Container, Row, Col, Button } from "reactstrap";

export default class NewProjectPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return(
			<div className="create_project">
				<NewProjectNavbar history={this.props.history}/>
				<Container className="create_project_content">
					<div>
						<form>
							<label>
								Insert Photo
								<input type="file" accept="image/*"/>
							</label>
							<label>
								Name
								<input type="text"/>
							</label>
							<label>
								Description
								<textarea className="description"/>
							</label>
							<label>
								<input type="submit" value="Submit"/>
							</label>
						</form>
					</div>
				</Container>
			</div>
		);
	}
}
