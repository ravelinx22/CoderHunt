import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppContainer from "../../ui/containers/AppContainer.jsx";
import NotFoundPage from "../../ui/pages/NotFoundPage.jsx";
import Home from "../../ui/pages/Home.jsx";

export const renderRoutes = () => ( 
	<Router> 
		<AppContainer>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</AppContainer>
	</Router>
);
