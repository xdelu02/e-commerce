import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { removeToCart, updateToCart } from '../../../actions';
import del from '../../../assets/icons/delete-red.png';
import CSSModules from 'react-css-modules';
import styles from './Prod.module.scss';

function ProdCart(props) {
	const cartRedux = useSelector((state) => state.cart);
	const cart = props.cart;
	const [borderClass, setBorderClass] = useState('border');
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

	function getClass() {
		return 'd-flex align-items-center justify-content-between border-bottom border-light pb-3';
	}

	useEffect(() => {
		cart.forEach((e) => {
			if (e.idProdotto === props.id) {
				setQta(e.quantita);
				return;
			}
		});
	}, [props.id, cart]);

	const returnAll = () => {
		
	}

	return (
		<div id={props.id} className={'d-flex align-items-center justify-content-between border-bottom border-light pb-3'}>
			<img src={'/img/' + props.nome + '.png'} alt='prodotto' styleName='prodImage' />
			<p>{props.nome}</p>
			<p>{props.prezzo + '€'}</p>
			<p id={props.id}>Quantita: {qta}</p>
			<div className='d-flex justify-content-center'>
				<button>-</button>
				<input type='number' onChange={updateProd} value='0' />
				<button>+</button>
			</div>
			<img src={del} id={props.id} onClick={removeProd} alt='' style={{ width: '24px', height: '24px' }} />
		</div>
	);
}

export default CSSModules(ProdCart, styles, { allowMultiple: true });

/*
  pb - 3
  py - 3
  pt-3
*/
