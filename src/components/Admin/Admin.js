import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Admin.module.scss';
import Logo from '../../assets/logo/logo.png';
import ordersIcon from '../../assets/icons/piggy-bank.png';
import profitIcon from '../../assets/icons/check-list.png';

function Admin() {
	const [show, setShow] = useState(false);

	return (
		<div styleName='container'>
			<main styleName='main-content'>
				<div>
					<h1>Welcome, admin</h1>
				</div>
				<div styleName='box-container'>
					<div styleName='box orders-box'>
						<img src={profitIcon} styleName='icon' />
						<div>
							<h4>23789</h4>Ordini
						</div>
					</div>
					<div styleName='box profit-box'>
						<img src={ordersIcon} styleName='icon' />
						<div>
							<h4>&euro; 12890,89</h4> Ricavo
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default CSSModules(Admin, styles, { allowMultiple: true });
