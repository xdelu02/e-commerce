import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.scss';
import shoppingCart from '../../assets/icons/shopping-cart.png';

function Nav() {
	return (
		<header>
			<Link to={'/shop'}>
				<img src="http://localhost/API/img/logo-noname.png" alt="logo" id="logo" />
			</Link>
			<input type="checkbox" id="nav-toggle" className="nav-toggle" />
			<nav>
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

					<li>
						<Link to={'/shop'}>Login</Link>
					</li>
				</ul>
			</nav>
			<Link to={'/carrello'}>
				<img src={shoppingCart} id="shoppingCart" alt="shopping cart" />
			</Link>
			<label htmlFor="nav-toggle" className="nav-toggle-label">
				<span></span>
			</label>
		</header>
	);
}

export default Nav;
