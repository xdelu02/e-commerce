import React, { useRef } from 'react';
import { useAsync } from 'react-async';
import ProdCart from './ProdCart/ProdCart';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

function Carrello() {
	//const cart = useSelector((state) => state.cart);
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const history = useHistory('/carrello');
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
		return data ? <ProdCart id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} cart={cart} /> : null;
	};

	const Tot = ({cart}) => {
		const tot = useRef(0);
		cart.forEach((element) => {
			tot.current = parseFloat(tot.current ? tot.current : 0) + element.prezzo * element.quantita;
		});
		return <p>Spesa totale: {tot.current} €</p>;
	}

	const handleOnClick = () => {
		history.push('/checkout');
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
				<Tot cart={cart}></Tot>
				{getCurrentUserEmail() !== null && getCurrentUserEmail() !== '' ? <button onClick={handleOnClick}>compra</button> : <a href='/login'>Esegui il login</a>}
			</div>
		</>
	);
}

export default Carrello;
