import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { removeToCart, updateToCart } from '../../../actions';
import del from '../../../assets/icons/delete-red.png';

export default function ProdCart(props) {
	const cartRedux = useSelector((state) => state.cart);
	const cart = props.cart;
	const [qta, setQta] = useState(1);
	const dispatch = useDispatch();
	const history = useHistory();

	const removeProd = (e) => {
		dispatch(
			removeToCart({
				idProdotto: e.target.id
			})
		);
		localStorage.setItem('cart', JSON.stringify(cartRedux));
		history.push('/carrello');
	};

	const updateProd = async (e) => {
		setQta(parseInt(e.target.value));
		dispatch(
			updateToCart({
				idProdotto: e.target.id,
				quantita: parseInt(e.target.value)
			})
		);
		localStorage.setItem('cart', JSON.stringify(cartRedux));
		history.push('/carrello');
	};

	useEffect(() => {
		cart.forEach((e) => {
			if (e.idProdotto === props.id) {
				setQta(e.quantita);
				return;
			}
		});
	}, [props.id, cart]);

	return (
		<div id={props.id}>
			<img src={'http://ecommerce.ideeinbit.it/img/' + props.nome + '.png'} alt='prodotto' style={{ width: '75px', height: '75px', objectFit: 'cover' }} />
			<p className='title'>{props.nome}</p>
			<p className='descS'>{props.descS}</p>
			<p className='prezzo'>{props.prezzo + '€'}</p>
			<p id={props.id}>Quantita: {qta}</p>
			<div className='custom-select m'>
				<select id={props.id} onChange={updateProd} value={qta}>
					{Array.from(new Array(qta), (x, i) => i + 1)
						.reverse()
						.map((n) => (
							<option value={n} key={n}>
								{n}
							</option>
						))}
				</select>
			</div>
			<img src={del} id={props.id} onClick={removeProd} alt='' style={{ width: '24px', height: '24px' }} />
		</div>
	);
}
