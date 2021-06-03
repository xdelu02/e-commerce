import React, { useEffect, useRef } from 'react';

const PayPal = ({cart, setDone}) => {
	const paypal = useRef();

	useEffect(() => {
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
	}, [cart, setDone]);
	return <div ref={paypal} style={{marginTop: '1rem'}}></div>;
};

export default PayPal;
