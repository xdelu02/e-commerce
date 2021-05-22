import { Container } from '@themesberg/react-bootstrap';
import React, { useState, useEffect } from 'react';
import Prodotto from './Prodotto/Prodotto';

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

	const searchProd = (event) => {
		setKey(event.target.value);
		load();
	};

	const GridShop = ({ data }) => {
		console.log(data);
		return (
			<div className="mt-5 w-100">
				{data.map((row, i) => (
					<RowProdotti data={row} key={i}/>
				))}
			</div>
		);
	};

	const RowProdotti = ({ data }) => {
		return (
			<div className="row equal d-flex justify-content-center">
				{data.map((cell, i) => (
					<Cell data={cell} key={i} />
				))}
			</div>
		);
	};

	const Cell = ({ data }) => {
		return <Prodotto id={data.idProdotto} path={'/img/' + data.nome + '.png'} prezzo={data.prezzo} titolo={data.nome} descS={data.descS} />;
	};

	useEffect(() => {
		load(setProdotti, chunk, key);
	}, [key]);

	return (
		<main className='shop-container'>
			<GridShop data={prodotti}></GridShop>
		</main>
	);
}

export default Shop;
