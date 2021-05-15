import React, { useEffect, useState } from 'react';
import OrdiniAdmin from './OrdiniAdmin';
import CSSModules from 'react-css-modules';
import styles from './Ordini.module.scss';

function Ordini() {
	const [ordini, setOrdini] = useState([]);

	const load = () => {
		fetch('http://ecommerce.ideeinbit.it/api/ordini/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'No Ordini found.') {
						setOrdini(result.records);
					}
				},
				(error) => {
					setOrdini([{}]);
					console.log(error);
				}
			);
	};

	useEffect(() => {
		load();
	});

	return (
		<>
			<p styleName='test'>Ordini</p>
			<table>
				<thead>
					<tr>
						<th>idOrdine</th>
						<th>idCliente</th>
						<th>indirizzo</th>
						<th>codice</th>
					</tr>
				</thead>
				{ordini.map((e, i) => (
					<OrdiniAdmin key={i} idOrdine={e.idOrdine} idCliente={e.idCliente} indirizzo={e.indirizzo} codice={e.codice} />
				))}
			</table>
			<button className='btn btn-primary'>gg</button>
		</>
	);
}

export default CSSModules(Ordini, styles, { allowMultiple: true });
