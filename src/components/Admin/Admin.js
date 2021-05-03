import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Ordini from './Ordini/Ordini';
import Prodotti from './Prodotti/Prodotti';
import CSSModules from 'react-css-modules';
import Home from '../../assets/icons/home.png';
import Bag from '../../assets/icons/bag.png';
import Sent from '../../assets/icons/sent.png';
import styles from './Admin.module.scss';

function Admin() {
	return (
		<div styleName='admin'>
			<ul htmlFor='select' styleName='selectors'>
				<li styleName='selector active'>
					<a href='/admin' styleName='a main'>
						<img src={Home} styleName='icon' alt='icon' />
						Dashboard
					</a>
				</li>
				<li styleName='selector'>
					<a href='/admin/prodotti' styleName='a tex'>
						<img src={Bag} styleName='icon' alt='icon' />
						Prodotti
					</a>
				</li>
				<li styleName='selector'>
					<a href='/admin/ordini' styleName='a tex'>
						<img src={Sent} styleName='icon' alt='icon' />
						Ordini
					</a>
				</li>
			</ul>
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
