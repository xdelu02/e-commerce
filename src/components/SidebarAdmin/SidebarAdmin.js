import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faHandHoldingUsd, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Nav, Badge, Image, Button, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/logo.png';

export default function SidebarAdmin() {
	const location = useLocation();
	const { pathname } = location;
	const [show, setShow] = useState(false);
	const showClass = show ? 'show' : '';

	const onCollapse = () => setShow(!show);
	const NavItem = (props) => {
		const { title, link, icon, image, badgeText, badgeBg = 'secondary', badgeColor = 'primary' } = props;
		const classNames = badgeText ? 'd-flex justify-content-start align-items-center justify-content-between' : '';
		const navItemClassName = link === pathname ? 'active' : '';
		const linkProps = { href: link };

		return (
			<Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
				<Nav.Link {...linkProps} className={classNames} >
					<span>
						{icon ? (
							<span className='sidebar-icon'>
								<FontAwesomeIcon icon={icon} />
							</span>
						) : null}
						{image ? <Image src={image} width={40} height={40} className='sidebar-icon svg-icon' /> : null}

						<span className='sidebar-text'>{title}</span>
					</span>

					{badgeText ? (
						<Badge pill bg={badgeBg} text={badgeColor} className='badge-md notification-count ms-2'>
							{badgeText}
						</Badge>
					) : null}
				</Nav.Link>
			</Nav.Item>
		);
	};

	return (
		<>
			<Navbar expand={false} collapseOnSelect variant='dark' className='navbar-theme-primary px-4 d-md-none'>
				<Navbar.Brand className='me-lg-5' as={Link} to={''}>
					<Image src={Logo} className='navbar-brand-light' />
				</Navbar.Brand>
				<Navbar.Toggle as={Button} aria-controls='main-navbar' onClick={onCollapse}>
					<span className='navbar-toggler-icon' />
				</Navbar.Toggle>
			</Navbar>
			<CSSTransition timeout={300} in={show} classNames='sidebar-transition'>
				<SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
					<div className='sidebar-inner px-4 pt-3'>
						<div className='user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4'>
							<div className='d-flex align-items-center ms-3'>
								<div className='d-block'>
									<h6>Ciao, Admin</h6>
									<Button as={Link} variant='secondary' size='xs' to={''} className='text-dark'>
										<FontAwesomeIcon icon={faSignOutAlt} className='me-2' /> Sign Out
									</Button>
								</div>
							</div>
							<Nav.Link className='collapse-close d-md-none' onClick={onCollapse}>
								<FontAwesomeIcon icon={faTimes} />
							</Nav.Link>
						</div>
						<Nav className='flex-column pt-3 pt-md-0'>
							<NavItem title='' link={''} image={Logo} />
							<NavItem title='Dashboard' link='/admin' icon={faChartPie} />
							<NavItem title='Prodotti' link='/admin/prodotti' icon={faHandHoldingUsd} />
							<NavItem title='Ordini' link='/admin/ordini' icon={faCog} />
							<NavItem title='Admin' link='/admin/admins' icon={faChartPie} />
						</Nav>
					</div>
				</SimpleBar>
			</CSSTransition>
		</>
	);
}
