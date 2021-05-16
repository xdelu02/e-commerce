import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Products from './Prodotti/Prodotti';
import Admins from './Admins/Admins';
import Orders from './Ordini/Ordini';
import Sidebar from '../SidebarAdmin/SidebarAdmin';

export default function Admin() {
	return (
		<>
			<Sidebar />
			<main className='content'>
				<Router>
					<Switch>
						<Route path='/admin/' exact component={Dashboard} />
						<Route path='/admin/prodotti' exact component={Products} />
						<Route path='/admin/ordini' exact component={Orders} />
						<Route path='/admin/admins' exact component={Admins} />
					</Switch>
				</Router>
			</main>
		</>
	);
}
