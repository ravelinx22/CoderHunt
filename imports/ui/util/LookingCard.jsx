import "../css/LookingCard.css";
import { Container as Grid, Row, Col, Button } from "reactstrap";
import React, { Component } from "react";
import { BounceLoader } from 'react-spinners';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

class LookingCard extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	renderImage() {
		var foundUser = Meteor.users.findOne({_id: Meteor.userId()});
		if(foundUser && foundUser.image_url) {
			return foundUser.image_url;
		}

		return "https://www.thesourcepartnership.com/wp-content/uploads/2017/05/facebook-default-no-profile-pic-300x300.jpg";
	}

	render() {
		return(
			<div className="tinder--card looking--card">
				{ !this.props.emptyProjects ?
						<div className="spinner">
							<BounceLoader color={'#193441'} loading={true} className="spinner" />
						</div> : null }
						<img className="looking_card_img rounded-circle" src={this.renderImage()} alt="looking card" />
						<div className="looking_card_title">{this.props.emptyProjects ? "You don't have proyects yet" : "Searching for results..."}</div>
					</div>
		);
	}
}

export default withTracker((props) => {
	return {
		user: Meteor.user(),
	}
})(LookingCard);
