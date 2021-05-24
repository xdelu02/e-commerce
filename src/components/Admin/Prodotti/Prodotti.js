import React, { useEffect, useState } from 'react';
import ProdAdmin from './ProdAdmin';
import CSSModules from 'react-css-modules';
import styles from './Prodotti.module.scss';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const load = (key, setProdotti) => {
	fetch('/api/prodotti/?key=' + key)
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.message !== 'No matching Prodotti found.') {
					setProdotti(result.records);
				} else {
					setProdotti([]);
				}
			},
			(error) => {
				setProdotti([]);
			}
		);
};

function Prodotti() {
	const [prodotti, setProdotti] = useState([]);
	const [key, setKey] = useState('');

	const searchProd = (event) => {
		setKey(event.target.value);
		load(key, setProdotti);
	};

	useEffect(() => {
		load(key, setProdotti);
	}, [key, setProdotti]);

	return (
		<div styleName='container'>
			<InputGroup onChange={searchProd}>
				<InputGroup.Text>
					<FontAwesomeIcon icon={faSearch} />
				</InputGroup.Text>
				<Form.Control type='text' placeholder='Cerca un prodotto...' />
			</InputGroup>
			<div styleName='auto-grid'>
				{prodotti.map((e, i) => (
					<ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} quantita={e.quantita} prezzo={e.prezzo} />
				))}
			</div>
		</div>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });
