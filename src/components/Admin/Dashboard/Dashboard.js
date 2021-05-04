import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory } from 'react-router';
import Sent from '../../../assets/icons/sent.png';
import styles from './Dashboard.module.scss';

function Dashboard() {
	const saluti = ['Ciao', 'Benvenuto', 'Bentornato', 'Salve', 'Buongiorno'];
	const [nOrdini, setnOrdini] = useState(0);
	const [admin, setAdmin] = useState({
		email: 'admin@admin.admi'
	});
	const history = useHistory();

	const getCredentials = () => {
		fetch('http://ecommerce.ideeinbit.it/api/amministratori/?email=' + admin.email)
			.then((res) => res.json())
			.then(
				(result) => {
					if (typeof result.records === 'undefined' || result.records === null) {
						//history.push('/404');
						//window.location.href = '/404';
					}
					setAdmin(result.records[0]);
				},
				(error) => {
					console.log(error);
					history.push('/404');
				}
			);
	};
	const getOrdini = () => {
		fetch('http://ecommerce.ideeinbit.it/api/ordini/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'No Ordini found.') {
						setnOrdini(result.records.length);
					}
				},
				(error) => {
					console.log(error);
					history.push('/404');
				}
			);
	};

	useEffect(() => {
		getCredentials();
		getOrdini();
	}, [getCredentials, getOrdini]);

	return (
		<div styleName='dashboard'>
			<p>
				{saluti[Math.floor(Math.floor(Math.random() * 10) / 2)]}, {admin.nome}
			</p>
			<p>
				numero totale di ordini: {nOrdini} <img src={Sent} styleName='icon' alt='icon' />
			</p>
		</div>
	);
}

export default CSSModules(Dashboard, styles, { allowMultiple: true });
