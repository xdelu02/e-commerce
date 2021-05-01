import React from 'react';
import { useAsync } from 'react-async';
import { useSelector } from 'react-redux';
import ProdCart from './ProdCart/ProdCart';


function Carrello() {
	const cart = useSelector((state) => state.cart);

	const fetchPerson = async ({ id }, { signal }) => {
		const response = await fetch('http://ecommerce.ideeinbit.it/api/prodotti/' + id, { signal });
		if (!response.ok) throw new Error(response.status);
		return response.json();
	};

	const Prodotto = ({ id }) => {
		const { data, error } = useAsync({ promiseFn: fetchPerson, id });
		if (error) {
			console.log(error.message);
		}
		return data ? <ProdCart id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} /> : null;
	};

	return (
		<>
			<h1>CARRELLO</h1>
			<div>
				{cart.map((e, i) => (
					<Prodotto id={e.idProdotto} key={i} />
				))}
			</div>
		</>
	);
}

export default Carrello;
