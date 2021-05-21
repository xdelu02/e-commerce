import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Nav.module.scss';
import ShoppingCart from '../../assets/icons/shopping-cart.png';
import Logo from '../../assets/logo/logo.png';
import { Navbar, Nav, Image } from '@themesberg/react-bootstrap';

function NavigationBarShop() {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' sticky='top' styleName="navbar">
			<Nav.Link href='/' className='ms-4'>
				<img src={Logo} alt='Logo' styleName="logo"/>
			</Nav.Link>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' className='me-4' styleName="toggler"/>
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav.Link href='/'>Home</Nav.Link>
				<Nav.Link href='/shop'>Shop</Nav.Link>
				<Nav.Link href='/shop'>Account</Nav.Link>
				<Nav.Link href='/shop'>About</Nav.Link>
			</Navbar.Collapse>
			<Nav.Link href='/carrello' className='ms-auto'>
				<img src={ShoppingCart} styleName='cart' />
			</Nav.Link>
		</Navbar>
	);
}

export default CSSModules(NavigationBarShop, styles, { allowMultiple: true });
