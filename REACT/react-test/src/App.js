import React from 'react';
import Shop from './Shop/Shop';
import DettaglioProdotto from './DettaglioProdotto/DettaglioProdotto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Shop} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/shop/:id" exact component={DettaglioProdotto} />
			</Switch>
		</Router>
	);
}

export default App;