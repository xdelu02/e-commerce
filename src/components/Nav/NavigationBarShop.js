import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Nav.module.scss';
import shoppingCart from '../../assets/icons/shopping-cart.png';
import accountIcon from '../../assets/icons/account.png';
import logo from '../../assets/logo/logo.png';

function NavigationBarShop() {
	return (
		<header styleName="header">
			<Link to={'/shop'}>
				<img styleName='logo' src={logo} alt='' />
			</Link>
			<input type='checkbox' styleName='nav-toggle' />
			<nav styleName='nav'>
				<ul>
					<li>
						<Link to={'/'}>Home</Link>
					</li>

					<li>
						<Link to={'/shop'}>Shop</Link>
					</li>

					<li>
						<Link to={'/shop'}>Contact</Link>
					</li>

					<li>
						<Link to={'/shop'}>About</Link>
					</li>
				</ul>
			</nav>
			<Link to={'/carrello'}>
				<img src={shoppingCart} styleName='shopping-cart' alt='' />
			</Link>

			<Link to={'/account'}>
				<img src={accountIcon} styleName='account-icon' alt='' />
			</Link>

			<label htmlFor='nav-toggle' styleName='nav-toggle-label'>
				<span></span>
			</label>
		</header>
	);
}

export default CSSModules(NavigationBarShop, styles, { allowMultiple: true });
