import React, { useState, useEffect } from 'react';
import Prodotto from './Prodotto/Prodotto';
import { Accordion, Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Shop.scss';
import Filter from './Filtri/Filter';
import AccordionComponent from '../Accordion/AccordionComponent';

function load(setProdotti, chunk, key) {
	fetch('/api/prodotti/?key=' + key)
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.message === 'No matching Prodotti found.') {
					setProdotti([]);
				} else {
					setProdotti(chunk(result.records));
				}
			},
			(error) => {
				setProdotti([]);
				console.log(error);
			}
		);
}

function chunk(arr) {
	const size = 4;
	const chunkedArray = [];
	for (let i = 0; i < arr.length; i++) {
		const last = chunkedArray[chunkedArray.length - 1];
		if (!last || last.length === size) {
			chunkedArray.push([arr[i]]);
		} else {
			last.push(arr[i]);
		}
	}
	return chunkedArray;
}

function Shop() {
	const [prodotti, setProdotti] = useState([]);
	const [key, setKey] = useState('');

	const searchProd = async (event) => {
		setKey(event.target.value);
		load(setProdotti, chunk, key);
	};

	const GridShop = ({ data }) => {
		return (
			<div className='mt-5 w-100'>
				{data.map((row, i) => (
					<RowProdotti data={row} key={i} />
				))}
			</div>
		);
	};

	const RowProdotti = ({ data }) => {
		return (
			<div className='row equal d-flex justify-content-center'>
				{data.map((cell, i) => (
					<Cell data={cell} key={i} />
				))}
			</div>
		);
	};

	const Cell = ({ data }) => {
		return <Prodotto id={data.idProdotto} path={'/img/' + data.path} prezzo={data.prezzo} titolo={data.nome} descS={data.descS} />;
	};

	const filterBgScreen = () => {
		return '';
	};

	useEffect(() => {
		load(setProdotti, chunk, key);
	}, [key]);

	return (
		<>
			<header className='py-3 mb-4 border-bottom'>
				<div className='container-fluid d-grid gap-3 align-items-center' style={{ gridTemplateColumns: '1fr 2fr' }}>
					<div>
						<a href='#' className='d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none'>
							<i className='bi bi-bootstrap fs-2 text-dark'></i>
						</a>
					</div>
					<div className='d-flex align-items-center'>
						<form className='w-100 me-3'>
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
				<div className='row flex-grow-sm-1 flex-grow-0'>
					<div className='col-sm-3 flex-grow-sm-1 flex-shrink-1 flex-grow-0 pb-sm-0 pb-3 filter-products-shop '>
						<div className='bg-light border rounded-3 p-1 h-100'>
							<h5 className='d-none d-sm-block text-bold mt-4'>Imposta filtri</h5>
							<hr className='d-none d-sm-block text-muted' />
							<ul className='nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate'>
								<Filter></Filter>
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
								description: <Filter></Filter>
							}
						]}
					/>

					<div className='col overflow-auto h-100'>
						<div className='bg-light border rounded-3 p-3'>
							<h3>Catalogo</h3>
							<GridShop data={prodotti}></GridShop>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Shop;
