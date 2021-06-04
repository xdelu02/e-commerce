import React, { useState, useEffect } from 'react';
import Prodotto from './Prodotto/Prodotto';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Filter from './Filtri/Filter';
import AccordionComponent from '../Accordion/AccordionComponent';
import './Shops.scss';
import CSSModules from 'react-css-modules';
import styles from './Shop.module.scss';

function load(setProdotti, key) {
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
}

function Shop() {
	const [prodotti, setProdotti] = useState([]);
	const [categorie, setCategorie] = useState([]);
	const [key, setKey] = useState('');

	const searchProd = async (event) => {
		setKey(event.target.value);
		load(setProdotti, key);
	};

	const handleCategorie = (cat) => {
		let tmp = categorie;
		let add = true;
		tmp.forEach((c, i) => {
			if (c === cat) {
				tmp.splice(i, 1);
				add = false;
			}
		});
		if (add) {
			tmp.push(cat);
		}
		setCategorie(tmp);
		load(setProdotti, key);
	};

	useEffect(() => {
		load(setProdotti, key);
	}, [key]);

	return (
		<>
			<header className='py-3 mb-4 border-bottom'>
				<div className='container-fluid d-grid'>
					<div className='row flex-grow-sm-1 flex-grow-0 w-100'>
						<form className='ms-auto searchbar-shop'>
							<InputGroup onChange={searchProd}>
								<InputGroup.Text>
									<FontAwesomeIcon icon={faSearch} />
								</InputGroup.Text>
								<Form.Control type='text' placeholder='Cerca un prodotto...' />
							</InputGroup>
						</form>
					</div>
				</div>
			</header>
			<main className='container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto '>
				<div className='row flex-grow-sm-1 flex-grow-0 w-100'>
					<div className='col-sm-3 flex-grow-sm-1 flex-shrink-1 flex-grow-0 pb-sm-0 pb-3 filter-products-shop '>
						<div className='bg-light border rounded-3 p-1 h-100'>
							<h5 className='d-none d-sm-block text-bold mt-4'>Imposta filtri</h5>
							<hr className='d-none d-sm-block text-muted' />
							<ul className='nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate'>
								<Filter handleCategorie={handleCategorie}></Filter>
							</ul>
						</div>
					</div>

					<AccordionComponent
						className='filter-products-shop-sm mb-3'
						defaultKey='panel-1'
						data={[
							{
								id: 2,
								eventKey: 'panel-2',
								title: 'Imposta filtri',
								description: <Filter handleCategorie={handleCategorie}></Filter>
							}
						]}
					/>

					<div className='col overflow-auto h-100 ms-md-5'>
						<h3>Catalogo</h3>

						<div styleName='auto-grid'>
							{prodotti
								? prodotti
										.filter((val) => {
											if (val.quantita > 0) {
												if (categorie.length) {
													return categorie.find((c) => {
														return c === val.idCategoria;
													})
														? val
														: null;
												} else {
													return val;
												}
											} else return null;
										})
										.map((e, index) => <Prodotto id={e.idProdotto} path={'/img/' + e.path} prezzo={e.prezzo} titolo={e.nome} descS={e.descS} key={index} />)
								: null}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default CSSModules(Shop, styles, { allowMultiple: true });
