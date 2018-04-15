import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../css/ChatList.css";
import ChatItem from "./ChatItem.jsx";
import { chats_preview } from "../testdata.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Chats } from "../../api/chats/Chats.js";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class ChatList extends Component {
	constructor(props) {
		super(props);
	}

	renderChats() {
		if(this.props.chats && this.props.chats.length > 0) {
			return this.props.chats.map((chat) => {
				return <ChatItem key={chat._id} chat={chat} isUserMode={this.props.isUserMode} />;
			});
		} else {
			return <div className="empty_chats_title">No chats or messages found</div>
		}
	}

	componentDidMount() {
		const that = this;
		Tracker.autorun(function () {
			const currentTime = new Date();
			Chats.find(that.props.getOptions(currentTime)).observe({
				added: function(doc) {
					that.onMatch();
				}
			});
		})
	}

	onMatch() {
		Alert.info('<h4>There\' a match</h4>', {
			position: 'top',
			effect: 'jelly',
			timeout: 2000,
			html: true,
		});
	}

	render() {
		return(
			<ul className={"chat_list " + this.props.className}> 
				{this.renderChats()}
			</ul>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe("chats") ;

	function getOptions(currentTime) {
		return {
			$or: [{userId: Meteor.userId()},{projectOwnerId: Meteor.userId() }], 
			createdAt: {$gt: currentTime}
		}
	}

	return {
		chats: (props.isUserMode ? Chats.find({userId: Meteor.userId()}, {sort: {updatedAt: -1}}).fetch() :  Chats.find({projectOwnerId: Meteor.userId()}, {sort: {updatedAt: -1}}).fetch() ),
		getOptions: getOptions,
	};
})(ChatList);
