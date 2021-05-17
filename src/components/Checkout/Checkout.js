import React, { useEffect, useRef, useState } from 'react';

const Checkout = () => {
	const [done, setDone] = useState(false);
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
									value: 650.0
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
