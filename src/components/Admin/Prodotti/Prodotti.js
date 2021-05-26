import React, { useEffect, useState } from 'react';
import ProdAdmin from './ProdAdmin';
import CSSModules from 'react-css-modules';
import styles from './Prodotti.module.scss';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const load = (key, setProdotti) => {
	fetch('/api/prodotti/?key=' + key)
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.message !== 'No Prodotti found.' && result.message !== 'No matching Prodotti found.') {
					setProdotti(result.records);
				}
			},
			(error) => {
				console.log(error);
			}
		);
};

function Prodotti() {
	const history = useHistory('/admin/prodotti/');
	const [prodotti, setProdotti] = useState([]);
	const [key, setKey] = useState('');

	const searchProd = (event) => {
		setKey(event.target.value);
		load(key, setProdotti);
	};

	const handleAggiungi = () => {
		history.push('/admin/prodotti/add');
	};

	useEffect(() => {
		load(key, setProdotti);
	}, [key, setProdotti]);

	return (
		<div styleName='container'>
			<div className='d-flex justify-content-between flex-nowrap flex-md-nowrap align-items-center py-4'>
				<InputGroup onChange={searchProd} className='me-5'>
					<InputGroup.Text>
						<FontAwesomeIcon icon={faSearch} />
					</InputGroup.Text>
					<Form.Control type='text' placeholder='Cerca un prodotto...' />
				</InputGroup>
				<button className='btn text-dark bg-secondary' onClick={handleAggiungi}>
					<FontAwesomeIcon icon={faPlus} />
					Nuovo
				</button>
			</div>

			<div styleName='auto-grid'>
				{prodotti.length ? prodotti.map((e, i) => <ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} quantita={e.quantita} prezzo={e.prezzo} path={e.path} />) : null}
			</div>
		</div>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });
