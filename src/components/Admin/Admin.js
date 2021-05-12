import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Admin.module.scss';
import Products from './Prodotti/Prodotti';
import Dashboard from './Dashboard/Dashboard';
import Admins from './Admins/Admins';
import Orders from './Ordini/Ordini';
import Logo from '../../assets/logo/fram4.png';
import DashboardIcon from '../../assets/icons/dashboard.png';
import ProductsIcon from '../../assets/icons/products.png';
import OrdersIcon from '../../assets/icons/orders.png';
import AdminIcon from '../../assets/icons/admin.png';
import MenuLi from './MenuLi';
import ModifyProduct from './Prodotti/ModifyProduct';

function Admin() {
	const [isChecked, setChecked] = useState(true);

	const setVar = () => {
		localStorage.setItem('menu', 0);
		localStorage.setItem('isChecked', true);
	};

	const isOpen = () => {
		let e = document.getElementById('container-admin-gen-0101');
		if (isChecked) {
			e.style.width = '100vw';
			setChecked(false);
		} else {
			e.style.width = '90vw';
			setChecked(true);
		}
	};

	return (
		<div styleName='container'>
			{localStorage.getItem('menu') ? '' : setVar}
			<ul styleName='side-menu'>
				<img src={Logo} styleName='logo' />
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
			<label htmlFor='side-menu-btn' styleName='lbl-for-side-btn' onClick={isOpen}></label>
			<div styleName='main-content' id='container-admin-gen-0101'>
				<Router>
					<Switch>
						<Route path='/admin' exact component={Dashboard} />
						<Route path='/admin/prodotti' exact component={Products} />
						<Route path='/admin/prodotti/:id' exact component={ModifyProduct} />
						<Route path='/admin/ordini' exact component={Orders} />
						<Route path='/admin/admins' exact component={Admins} />
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default CSSModules(Admin, styles, { allowMultiple: true });
