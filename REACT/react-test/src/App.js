import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Shop from './Shop/Shop';
import DettaglioProdotto from './DettaglioProdotto/DettaglioProdotto';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Carrello from './Carrello/Carrello';

function App() {
	return (
		<Router>
			<Nav></Nav>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/shop/:id" exact component={DettaglioProdotto} />
				<Route path="/carrello" exact component={Carrello} />
			</Switch>
		</Router>
	);
}

export default App;