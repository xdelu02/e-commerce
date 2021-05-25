import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Nav.module.scss';
import ShoppingCart from '../../assets/icons/cart.png';
import Logo from '../../assets/logo/logo.png';
import { Navbar, Nav } from '@themesberg/react-bootstrap';

function NavigationBarShop() {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' sticky='top' styleName='navbar'>
			<Nav.Link href='/' className='ms-4 py-0'>
				<img src={Logo} alt='Logo' styleName='logo' />
			</Nav.Link>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' className='me-4 py-1' styleName='toggler' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav.Link href='/' className='py-0'>
					Home
				</Nav.Link>
				<Nav.Link href='/shop' className='py-0'>
					Shop
				</Nav.Link>
				<Nav.Link href='/shop' className='py-0'>
					About
				</Nav.Link>
				<Nav.Link href='/login' className='py-0'>
					Account
				</Nav.Link>
			</Navbar.Collapse>
			<Nav.Link href='/carrello' className='ms-auto py-0'>
				<img src={ShoppingCart} styleName='cart' alt='' />
			</Nav.Link>
		</Navbar>
	);
}
export default CSSModules(NavigationBarShop, styles, { allowMultiple: true });
