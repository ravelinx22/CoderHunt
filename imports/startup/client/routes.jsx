import React from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppContainer from "../../ui/containers/AppContainer.jsx";
import NotFoundPage from "../../ui/pages/NotFoundPage.jsx";
import Home from "../../ui/pages/Home.jsx";
import ChatPage from "../../ui/pages/ChatPage.jsx";
import CardDetailPage from "../../ui/pages/CardDetailPage.jsx";
import NewProjectPage from "../../ui/pages/NewProjectPage.jsx";

export const renderRoutes = () => ( 
	<Router> 
		<AppContainer>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/chat/:id" component={ChatPage} />
				<Route path="/user/:id" component={CardDetailPage} />
				<Route path="/project/new" component={NewProjectPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</AppContainer>
	</Router>
);
