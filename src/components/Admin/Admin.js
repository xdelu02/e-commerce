import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Admin.module.scss';
import Products from './Prodotti/Prodotti';
import Dashboard from './Dashboard/Dashboard';
import Admins from './Admins/Admins';
import Orders from './Ordini/Ordini';
import Logo from '../../assets/logo/logo.png';
import DashboardIcon from '../../assets/icons/dashboard.png';
import ProductsIcon from '../../assets/icons/products.png';
import OrdersIcon from '../../assets/icons/orders.png';
import AdminIcon from '../../assets/icons/admin.png';
import MenuLi from './MenuLi';

function Admin() {
	return (
		<div styleName='container'>
			<ul styleName='side-menu'>
				<MenuLi id={0} img={DashboardIcon} name={'Dashboard'}>
					<Link to={'/admin'} />
				</MenuLi>

				<MenuLi id={1} img={OrdersIcon} name={'Ordini'}>
					<Link to={'/admin/ordini'} />
				</MenuLi>

				<MenuLi id={2} img={ProductsIcon} name={'Prodotti'}>
					<Link to={'/admin/prodotti'} />
				</MenuLi>

				<MenuLi id={3} img={AdminIcon} name={'Admin'}>
					<Link to={'/admin/admins'} />
				</MenuLi>
			</ul>
			<input type='checkbox' id='side-menu-btn' styleName='side-menu-btn' defaultChecked />
			<label htmlFor='side-menu-btn' styleName='lbl-for-side-btn'></label>
			<div styleName='main-content'>
				<Router>
					<Switch>
						<Route path='/admin' exact component={Dashboard} />
						<Route path='/admin/prodotti' exact component={Products} />
						<Route path='/admin/ordini' exact component={Orders} />
						<Route path='/admin/admins' exact component={Admins} />
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default CSSModules(Admin, styles, { allowMultiple: true });
