import React, { Component } from "react";
import { Row, Grid, Col } from 'react-bootstrap';

export default class AppContainer extends Component {
	render() {
		return(
			<Grid>
				{this.props.children}
			</Grid>
		);
	}
}
