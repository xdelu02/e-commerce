import React, { useEffect, useState } from 'react';
import ProdAdmin from './ProdAdmin';
import CSSModules from 'react-css-modules';
import styles from './Prodotti.module.scss';

function Prodotti() {
	const [prodotti, setProdotti] = useState([]);

	const load = () => {
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'No Prodotti found.') {
						setProdotti(result.records);
					}
				},
				(error) => {
					console.log(error);
				}
			);
	};

	useEffect(() => {
		load();
	});

	return (
		<>
			<p styleName="test">Prodotti</p>
			<table>
				<thead>
					<tr>
						<th>idProdotto</th>
						<th>nome</th>
						<th>descS</th>
						<th>descL</th>
						<th>quantita</th>
						<th>prezzo</th>
					</tr>
				</thead>
				{prodotti.map((e, i) => (
					<ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} descS={e.descS} descL={e.descL} quantita={e.quantita} prezzo={e.prezzo} />
				))}
			</table>
		</>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });