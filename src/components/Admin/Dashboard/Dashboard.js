import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory } from 'react-router';
import styles from './Dashboard.module.scss';

function Dashboard() {
	const [admin, setAdmin] = useState({
		email: 'admin@admin.admin'
	});
	const history = useHistory();

	useEffect(() => {
		fetch('http://ecommerce.ideeinbit.it/api/amministratori/?email=' + admin.email)
			.then((res) => res.json())
			.then(
				(result) => {
					if (!(typeof result.records === 'undefined' || result.records === null)) {
						window.location.href = '/404';
					}
					setAdmin(result.records);
				},
				(error) => {
					console.log(error);
					history.push('/404');
				}
			);
	}, []);

	return (
		<>
			<p>Dashboard</p>
			<p>{admin.nome}</p>
		</>
	);
}

export default CSSModules(Dashboard, styles, { allowMultiple: true });
