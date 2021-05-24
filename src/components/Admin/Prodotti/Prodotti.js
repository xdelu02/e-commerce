import React, { useEffect, useState } from 'react';
import ProdAdmin from './ProdAdmin';
import CSSModules from 'react-css-modules';
import styles from './Prodotti.module.scss';
import { Button, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

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
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<InputGroup onChange={searchProd}>
					<InputGroup.Text>
						<FontAwesomeIcon icon={faSearch} />
					</InputGroup.Text>
					<Form.Control type='text' placeholder='Cerca un prodotto...' />
				</InputGroup>
				<Button variant='secondary' className='text-dark' onClick={handleAggiungi}>
					<span className='icon icon-small ms-1'>
						<FontAwesomeIcon icon={faPlus} className='me-2' />
						<span>Aggiungi prodotto</span>
					</span>
				</Button>
			</div>

			<div styleName='auto-grid'>
				{prodotti.map((e, i) => (
					<ProdAdmin key={i} idProdotto={e.idProdotto} nome={e.nome} quantita={e.quantita} prezzo={e.prezzo} />
				))}
			</div>
		</div>
	);
}

export default CSSModules(Prodotti, styles, { allowMultiple: true });
