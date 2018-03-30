import React from "react";
import AppContainer from "../../ui/containers/AppContainer.jsx";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const renderRoutes = () => ( 
	<Router> 
		<AppContainer/>
	</Router>
);
