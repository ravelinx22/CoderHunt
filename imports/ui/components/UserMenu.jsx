import React, { Component } from 'react';
import { Link } from 'react-router';
import "../css/UserMenu.css";
import { Container, Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	toggle() {
		this.setState({
			open: !this.state.open,
		})
	}

	componentDidMount() {
	}

	goCreate() {
		this.props.history.push("/project/new");
	}

	render() {
		return(
			<div className="user-menu vertical" onClick={this.toggle.bind(this)}>
				<a className="bti-secondary unselectable">ravelinx22</a>
				{ this.state.open ?
						<div className="starting_option">
							<a className="bti-secondary" onClick={() => {this.props.history.push("/")}}>Home</a>
							<a className="bti-secondary" onClick={this.goCreate.bind(this)}>Create Project</a>
							<a className="bti-secondary">Logout</a>
						</div>
						: null }
					</div>
		); 
	}
}

export default withRouter(UserMenu);
