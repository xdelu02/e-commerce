import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Ordini from './Ordini/Ordini';
import Prodotti from './Prodotti/Prodotti';

export default function Admin() {
	return (
		<div>
			<div for="select">
				<a href='/admin'>Dashboard</a>
				<br />
				<a href='/admin/prodotti'>Prodotti</a>
				<br />
				<a href='/admin/ordini'>Ordini</a>
				<br />
			</div>
			<div for='specifiche'>
				<Router>
					<Switch>
						<Route path='/admin' exact component={Dashboard} />
						<Route path='/admin/prodotti' exact component={Prodotti} />
						<Route path='/admin/ordini' exact component={Ordini} />
					</Switch>
				</Router>
			</div>
		</div>
	);
}
