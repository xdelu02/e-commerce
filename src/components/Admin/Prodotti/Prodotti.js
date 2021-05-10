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
		<div styleName="container">
			<div>
				{prodotti.map((e, i) => (
					<ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} quantita={e.quantita} prezzo={e.prezzo} />
				))}
			</div>
		</div>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });
