import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Ordini from './Ordini/Ordini';
import Prodotti from './Prodotti/Prodotti';
import CSSModules from 'react-css-modules';
import styles from './Admin.module.scss';

function Admin() {
	return (
		<div styleName='admin'>
			<div htmlFor='select' styleName='selectors'>
				<a href='/admin' styleName='selector'>
					Dashboard
				</a>
				<a href='/admin/prodotti' styleName='selector'>
					Prodotti
				</a>
				<a href='/admin/ordini' styleName='selector'>
					Ordini
				</a>
			</div>
			<div htmlFor='specifiche' styleName='specs'>
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

export default CSSModules(Admin, styles, { allowMultiple: true });
