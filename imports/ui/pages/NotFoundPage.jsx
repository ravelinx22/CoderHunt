import React, { Component } from "react";
import Hammer from "react-hammerjs";
import Cards from "../util/Cards.jsx";
//Para usabilidad, me parece una muy buena adición que tengan una página que muestre el error 404 claramente a los usuarios.
export default class NotFoundPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return(
			<h1>404 Not Found</h1>
		);
	}
}
