import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Admin.module.scss';
import Logo from '../../assets/logo/logo.png';
import ordersIcon from '../../assets/icons/piggy-bank.png';
import profitIcon from '../../assets/icons/check-list.png';
import DashboardIcon from '../../assets/icons/dashboard.png';
import ProductsIcon from '../../assets/icons/products.png';
import OrdersIcon from '../../assets/icons/orders.png';
import AdminIcon from '../../assets/icons/admin.png';
import temp from '../../assets/icons/chart.png';

function Admin() {
	const [menu, setMenu] = useState(0);

	const changeMenu = (id) => {
		setMenu(id);
	};

	return (
		<div styleName='container'>
			<ul styleName='side-menu'>
				<li onClick={() => setMenu(0)} styleName={menu === 0 ? 'active' : 'non-active'}>
					<img src={DashboardIcon} /> Dashboard
				</li>
				<li onClick={() => changeMenu(1)} styleName={menu === 1 ? 'active' : 'non-active'}>
					<img src={OrdersIcon} /> Ordini
				</li>
				<li onClick={() => changeMenu(2)} styleName={menu === 2 ? 'active' : 'non-active'}>
					<img src={ProductsIcon} /> Prodotti
				</li>
				<li onClick={() => changeMenu(3)} styleName={menu === 3 ? 'active' : 'non-active'}>
					<img src={AdminIcon} /> Admin
				</li>
			</ul>
			<input type='checkbox' id='side-menu-btn' styleName='side-menu-btn' defaultChecked />
			<label htmlFor='side-menu-btn' styleName='lbl-for-side-btn'></label>
			<main styleName='main-content'>
				<div styleName='welcome-text'>
					<h3>
						<span>Benvenuto,</span> admin
					</h3>
				</div>
				<div styleName='box-container'>
					<div styleName='box orders-box'>
						<img src={profitIcon} styleName='box-icon' />
						<div>
							<h4>23789</h4>Ordini
						</div>
					</div>
					<div styleName='box profit-box'>
						<img src={ordersIcon} styleName='box-icon' />
						<div>
							<h4>&euro; 12890,89</h4> Ricavo
						</div>
					</div>
				</div>
				<img src={temp} style={{ width: '35rem' }} />
			</main>
		</div>
	);
}

export default CSSModules(Admin, styles, { allowMultiple: true });
