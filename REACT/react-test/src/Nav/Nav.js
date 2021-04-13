import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Nav.css";

function Nav() {
	return (
		<div className="nav">
			<Link to={"/shop"} style={{ textDecoration: 'none' }}>
				<img src="http://localhost/API/img/logo.png" alt="logo"/>
			</Link>
			<ul>
				<Link to={"/"} style={{ textDecoration: 'none' }}>
					<li>Home</li>
				</Link>
				<Link to={"/shop"} style={{ textDecoration: 'none' }}>
					<li>Shop</li>
				</Link>
				<Link to={"/shop"} style={{ textDecoration: 'none' }}>
					<li>Contact</li>
				</Link>
				<Link to={"/shop"} style={{ textDecoration: 'none' }}>
					<li>About</li>
				</Link>
			</ul>
			<Link to={"/shop"} style={{ textDecoration: 'none' }}>
				<div className="cart"><FontAwesomeIcon className="fa fa-2x" icon={faShoppingCart} aria-hidden="true"></FontAwesomeIcon></div>
			</Link>
		</div>
	);
}

export default Nav;