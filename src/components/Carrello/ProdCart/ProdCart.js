import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToCart, updateToCart } from '../../../actions';

export default function ProdCart(props) {
	const cart = useSelector((state) => state.cart);
	const [qta, setQta] = useState(1);
	const dispatch = useDispatch();

	const removeProd = (e) => {
		dispatch(
			removeToCart({
				idProdotto: e.target.id
			})
		);
	};

	const handleChange = async (e) => {
		setQta(parseInt(e.target.value));
		dispatch(
			updateToCart({
				idProdotto: e.target.id,
				quantita: parseInt(e.target.value)
			})
		);
	};

	useEffect(() => {
		const c = cart.filter((val) => {
			if (val.idProdotto === props.id) {
				return val.quantita;
			}
		});
		setQta(c[0].quantita);
	});

	return (
		<div id={props.id}>
			<img src={'http://ecommerce.ideeinbit.it/img/' + props.nome + '.png'} alt='prodotto' id='logo' />
			<p className='title'>{props.nome}</p>
			<p className='descS'>{props.descS}</p>
			<p className='prezzo'>{props.prezzo + '€'}</p>
			<p id={props.id}>Quantita: {qta}</p>
			<div className='custom-select m'>
				<select id={props.id} onChange={handleChange}>
					{Array.from(new Array(qta), (x, i) => i + 1).map((n) => (
						<option value={n} key={n}>
							{n}
						</option>
					))}
				</select>
			</div>
			<button id={props.id} onClick={removeProd}>
				RIMUOVI
			</button>
		</div>
	);
}
