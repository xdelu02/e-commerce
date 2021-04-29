import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Ordini from './Ordini/Ordini';
import Prodotti from './Prodotti/Prodotti';

export default function Admin() {
	return (
		<>
			<h1>ADMIN</h1>
			<Router>
				<Switch>
					<Route path='/admin' exact component={Dashboard} />
					<Route path='/admin/prodotti' exact component={Prodotti} />
					<Route path='/admin/ordini' exact component={Ordini} />
				</Switch>
			</Router>
		</>
	);
}
