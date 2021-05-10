import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { useSelector } from 'react-redux';
import ProdCart from './ProdCart/ProdCart';
import { useAuth } from '../../contexts/AuthContext';

function Carrello() {
	const [tot, setTot] = useState(0);
	//const cart = useSelector((state) => state.cart);
	const cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];
	const { getCurrentUserEmail } = useAuth();

	const fetchProd = async ({ id }, { signal }) => {
		const response = await fetch('http://ecommerce.ideeinbit.it/api/prodotti/' + id, { signal });
		if (!response.ok) throw new Error(response.status);
		return response.json();
	};

	const Prodotto = ({ id }) => {
		const { data, error } = useAsync({ promiseFn: fetchProd, id });
		if (error) {
			console.log(error.message);
		}
		return data ? <ProdCart id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} /> : null;
	};

	const handleOnClick = () => {
		console.log('ciao');
	};

	return (
		<>
			<h1>CARRELLO</h1>
			<div htmlFor='prodotti'>
				{cart.map((e, i) => (
					<Prodotto id={e.idProdotto} key={i} />
				))}
			</div>
			<div htmlFor='pagamento'>
				<p>Spesa tot: {tot} €</p>
				{getCurrentUserEmail() !== null && getCurrentUserEmail() !== '' ? <button onClick={handleOnClick}>compra</button> : <a href='/login'>Esegui il login</a>}
			</div>
		</>
	);
}

export default Carrello;
