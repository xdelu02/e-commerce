import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../actions';
import './Prodotto.scss';

function Prodotto(props) {
	const dispatch = useDispatch();

	const handleOnClick = (e) => {
		e.preventDefault();
		dispatch(
			addToCart({
				idProdotto: props.id,
				quantita: 1
			})
		);
	};

	return (
		<Link className='product-wrapper' to={'/shop/' + props.id}>
			<img src={props.path} alt='prodotto' className='product-image' />
			<p className='title'>{props.titolo}</p>
			<p className='descS'>{props.descS}</p>
			<p className='price'>{props.prezzo} €</p>
			<button type='button' className='btn btn--block btn--down-br' onClick={handleOnClick}>
				ADD TO CART
			</button>
		</Link>
	);
}

export default Prodotto;
