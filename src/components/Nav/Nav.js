import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.scss';
import shoppingCart from '../../assets/icons/shopping-cart.png';
import accountIcon from '../../assets/icons/account.png';

function Nav() {
	return (
		<header>
			<Link to={'/shop'}>
				<img id='logo' src='https://ecommerce.ideeinbit.it/img/logo-noname.png' alt="" onError={(e)=>{e.target.onerror = null; e.target.src="../../assets/icons/shopping-cart.png"}}/>
			</Link>
			<input type="checkbox" id="nav-toggle" className="nav-toggle" />
			<nav className="nav">
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
				<img src={shoppingCart} id="shoppingCart" alt="" />
			</Link>

			<Link to={'/account'}>
				<img src={accountIcon} id="accountIcon" alt="" />
			</Link>

			<label htmlFor="nav-toggle" className="nav-toggle-label">
				<span></span>
			</label>
		</header>
	);
}

export default Nav;