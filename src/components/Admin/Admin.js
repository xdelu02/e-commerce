import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import Dashboard from './Dashboard/Dashboard';
import Ordini from './Ordini/Ordini';
import Prodotti from './Prodotti/Prodotti';
import { useAuth } from '../../contexts/AuthContext';
import Home from '../../assets/icons/home.png';
import Bag from '../../assets/icons/bag.png';
import Sent from '../../assets/icons/sent.png';
import styles from './Admin.module.scss';
import { Sidenav, Nav, Icon, Dropdown, Toggle } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

function Admin() {
	//const { getCurrentUserEmail } = useAuth();
	const email = 'admin@admin.admin';

	const getCredentials = () => {
		fetch('http://ecommerce.ideeinbit.it/api/amministratori/?email=' + email)
			.then((res) => res.json())
			.then(
				(result) => {
					if (typeof result.records === 'undefined' || result.records === null) {
						//history.push('/404');
						window.location.href = '/404';
					}
				},
				(error) => {
					console.log(error);
					//history.push('/404');
					window.location.href = '/404';
				}
			);
	};

	return (
		<div styleName="container">
			<Sidenav defaultOpenKeys={['3', '4']} activeKey='1'>
				<Sidenav.Body>
					<Nav>
						<Nav.Item eventKey='1' icon={<Icon icon='dashboard' />}>
							Dashboard
						</Nav.Item>
						<Nav.Item eventKey='2' icon={<Icon icon='group' />}>
							User Group
						</Nav.Item>
						<Dropdown eventKey='3' title='Advanced' icon={<Icon icon='magic' />}>
							<Dropdown.Item eventKey='3-1'>Geo</Dropdown.Item>
							<Dropdown.Item eventKey='3-2'>Devices</Dropdown.Item>
							<Dropdown.Item eventKey='3-3'>Loyalty</Dropdown.Item>
							<Dropdown.Item eventKey='3-4'>Visit Depth</Dropdown.Item>
						</Dropdown>
						<Dropdown eventKey='4' title='Settings' icon={<Icon icon='gear-circle' />}>
							<Dropdown.Item eventKey='4-1'>Applications</Dropdown.Item>
							<Dropdown.Item eventKey='4-2'>Channels</Dropdown.Item>
							<Dropdown.Item eventKey='4-3'>Versions</Dropdown.Item>
							<Dropdown.Menu eventKey='4-5' title='Custom Action'>
								<Dropdown.Item eventKey='4-5-1'>Action Name</Dropdown.Item>
								<Dropdown.Item eventKey='4-5-2'>Action Params</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	);
}

export default CSSModules(Admin, styles, { allowMultiple: true });
