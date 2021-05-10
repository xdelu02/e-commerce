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
				quantita: 1
			})
		);
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	return (
		<Link className='product-wrapper' to={'/shop/' + props.id}>
			<img src={props.path} alt='prodotto' className='product-image' />
			<p className='title'>{props.titolo}</p>
			<p className='descS'>{props.descS}</p>
			<p className='price'>{props.prezzo} €</p>
			<button type='button' className='prod-btn' onClick={handleOnClick}>
				ADD TO CART
			</button>
		</Link>
	);
}

export default Prodotto;
