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
		<div className='col-lg-4 col-md-2 d-flex pb-3'>
			<Link className='card card-block' to={'/shop/' + props.id}>
				<div className='card-image'>
					<img src={props.path} alt='prodotto' className='"card-img-top' />
				</div>
				<div className='card-heading'>{props.titolo}</div>
				<div className='card-text descrizione-prodotto'>{props.descS}</div>
				<h3 className='card-text prezzo-prodotto'>{props.prezzo} €</h3>

				<button type='button' className='card-button bottone-card btn btn-primary' onClick={handleOnClick} style={{ borderTopLeftRadius: '0px', borderTopRigthRadius: '0px' }}>
					Aggiungi al carrello
				</button>
			</Link>
		</div>
	);
}

export default Prodotto;
