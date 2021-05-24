import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Datas from './Datas/Datas';

function Checkout() {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const [done, setDone] = useState(false);
	const [ind, setInd] = useState('');
	const [numeroCivico, setNumeroCivico] = useState('');
	const [cap, setCap] = useState('');
	const [citta, setCitta] = useState('');
	const [stato, setStato] = useState('Italia');

	const handleInd = (e) => {
		setInd(e.target.value);
	};
	const handleNCivico = (e) => {
		setNumeroCivico(e.target.value);
	};
	const handleCap = (e) => {
		setCap(e.target.value);
	};
	const handleCitta = (e) => {
		setCitta(e.target.value);
	};
	const handleStato = (e) => {
		setStato(e.target.value);
	};

	const Success = () => {
		const { getCurrentUserEmail } = useAuth();

		useEffect(() => {
			fetch('http://ecommerce.ideeinbit.it/api/carrelli/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idCliente: getCurrentUserEmail,
					indirizzo: ind+' '+numeroCivico+', '+cap+', '+citta+', '+stato,
					importo: cart.length ? cart.reduce((acc, item) => acc + item.quantita * item.prezzo, 0).toFixed(2) : Number(0).toFixed(2)
				})
			});
		});

		return <div>Pagamento avvenuto con successo. Torna al negozio.</div>;
	};

	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('cart')).length) {
			window.location.href = '/shop';
		}
	}, []);

	return (
		<div>
			{done ? (
				<Success />
			) : (
				<Datas
					cart={cart}
					setDone={setDone}
					ind={ind}
					numeroCivico={numeroCivico}
					cap={cap}
					citta={citta}
					stato={stato}
					handleInd={handleInd}
					handleNCivico={handleNCivico}
					handleCap={handleCap}
					handleCitta={handleCitta}
					handleStato={handleStato}
				/>
			)}
		</div>
	);
}

export default Checkout;
