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
		<Link className='card w-100 product-card' to={'/shop/' + props.id}>
			<div className='card-thumbnail ratio ratio-1x1'>
				<img src={props.path} alt='prodotto' className='img-fluid' style={{ objectFit: 'scale-down' }} />
			</div>
			<h4 className='mt-2 text-primary ms-1'>{props.titolo}</h4>
			<p className='ms-1'>{props.descS}</p>
			<p className='ms-1 text-bold'>{props.prezzo} €</p>
			<a href='#' className='btn btn-sm btn-primary float-right' onClick={handleOnClick}>
				Aggiungi al carrello
			</a>
		</Link>
	);
}

export default Prodotto;
