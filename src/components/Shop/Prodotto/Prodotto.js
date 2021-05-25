import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../actions';
import './Prodotto.scss';

function Prodotto(props) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const handleOnClick = (e) => {
		e.preventDefault();
		dispatch(
			addToCart({
				idProdotto: props.id,
				quantita: 1,
				prezzo: props.prezzo
			})
		);
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	return (
		<Link className='card w-100 product-card h-100' to={'/shop/' + props.id}>
			<div className='card-thumbnail ratio ratio-1x1'>
				<img src={props.path} alt='prodotto' className='img-fluid rounded-8' style={{ objectFit: 'scale-down' }} />
			</div>
			<h5 className='mt-2 text-dark ms-1'>{props.titolo}</h5>
			<p className='ms-1 text-gray'>{props.descS}</p>
			<p className='ms-1 font-monospace fw-bold'>{props.prezzo} €</p>
			<button className='btn btn-sm btn-primary float-right py-2' onClick={handleOnClick}>
				Aggiungi al carrello
			</button>
		</Link>
	);
}

export default Prodotto;
