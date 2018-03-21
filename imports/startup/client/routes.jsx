import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppContainer from "../../ui/containers/AppContainer.jsx";
import NotFoundPage from "../../ui/pages/NotFoundPage.jsx";

export const renderRoutes = () => ( 
	<Router> 
		<AppContainer>
			<Switch>
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</AppContainer>
	</Router>
);
