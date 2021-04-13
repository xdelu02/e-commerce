import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Shop from './Shop/Shop';
import DettaglioProdotto from './DettaglioProdotto/DettaglioProdotto';
import Nav from './Nav/Nav';
import Home from './Home/Home';

function App() {
	return (
		<Router>
			<Nav></Nav>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/shop/:id" exact component={DettaglioProdotto} />
			</Switch>
		</Router>
	);
}

export default App;