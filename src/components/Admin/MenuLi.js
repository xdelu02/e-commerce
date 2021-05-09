import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MenuLi.module.scss';

function MenuLi(props) {
    const pages = ['', '/ordini', '/prodotti', '/admins'];
    
	const changeMenu = () => {
		localStorage.setItem('menu', props.id);
		window.location.href = '/admin' + pages[props.id];
	};

	return (
		<li onClick={changeMenu} styleName={localStorage.getItem('menu') == props.id ? 'active' : 'non-active'}>
			<img src={props.img} />
			{props.name}
		</li>
	);
}

export default CSSModules(MenuLi, styles, { allowMultiple: true });
