import React, { useEffect, useRef, useState } from 'react';

function Checkout () {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const [done, setDone] = useState(false);
	const paypal = useRef();

	const tot = () => {
		let tot = 0;
		cart.forEach((element) => {
			tot = parseFloat(tot) + element.prezzo * element.quantita;
		});
		return tot;
	};

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
									value: tot()
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
	}, []);

	return <div>{done ? <div>Pagamento avvenuto con successo</div> : <div ref={paypal}></div>}</div>;
};

export default Checkout;
