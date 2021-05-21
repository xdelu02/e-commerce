import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Checkout () {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const [done, setDone] = useState(false);
	const paypal = useRef();



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
					indirizzo: 'INDIRIZZODAFARE',
					importo: cart.length ? cart.reduce((acc, item) => acc + item.quantita * item.prezzo, 0).toFixed(2) : Number(0).toFixed(2)
				})
			});
		});

		return <div>Pagamento avvenuto con successo. Torna al negozio.</div>;
	} 

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('cart')).length === 0) {
			window.location.href = '/shop';
		}
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'cool looking table',
								amount: {
									value: cart.length ? cart.reduce((acc, item) => acc + item.quantita * item.prezzo, 0).toFixed(2) : Number(0).toFixed(2)
								}
							}
						]
					});
				},
				onApprove: async (data, actions) => {
					await actions.order.capture();
					setDone(true);
				},
				onError: (err) => {
					console.log(err);
				}
			})
			.render(paypal.current);
	}, [cart]);

	return <div>{done ? <Success /> : <div ref={paypal}></div>}</div>;
};

export default Checkout;
