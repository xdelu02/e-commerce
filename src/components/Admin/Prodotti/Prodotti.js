import React, { useEffect, useRef, useState } from 'react';
import ProdAdmin from './ProdAdmin';
import CSSModules from 'react-css-modules';
import styles from './Prodotti.module.scss';

const load = (key, setProdotti) => {
	fetch('http://ecommerce.ideeinbit.it/api/prodotti/?key=' + key)
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.message !== 'No Prodotti found.') {
					setProdotti(result.records);
				}
				else {
					setProdotti([]);
				}
			},
			(error) => {
				console.log(error);
			}
		);
};

function Prodotti() {
	const [prodotti, setProdotti] = useState([]);
	const [key, setKey] = useState('');

	const filterProd = (event) => {
		setKey(event.target.value);
		load(key, setProdotti);
	};

	useEffect(() => {
		load(key, setProdotti);
	}, [load, key, setProdotti]);

	return (
		<div styleName='container'>
			<input type='text' placeholder='Cerca qui ...' onChange={filterProd}></input>
			<div styleName='auto-grid'>
				{prodotti.map((e, i) => (
					<ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} quantita={e.quantita} prezzo={e.prezzo} />
				))}
			</div>
		</div>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });
