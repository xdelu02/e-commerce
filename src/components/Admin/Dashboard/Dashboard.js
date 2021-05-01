import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Dashboard.module.scss';

function Dashboard() {
	return <p>Dashboard</p>;
}

export default CSSModules(Dashboard, styles, { allowMultiple: true });
