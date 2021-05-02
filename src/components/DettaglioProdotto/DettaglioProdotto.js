import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { addToCart } from '../../actions';
import { useHistory } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './DettaglioProdotto.module.scss';

function DettaglioProdotto(props) {
	const [prodotto, setProdotto] = useState({ nome: 'logo' });
	const [qtaMAX, setQtaMAX] = useState(1);
	const [qta, setQta] = useState(1);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/' + props.match.params.id)
			.then((res) => res.json())
			.then(
				(result) => {
					if (!(typeof result.records === 'undefined' || result.records === null)) {
						history.push('/404');
					}
					if (result.quantita === '0') {
						history.push('/shop');
					}
					setProdotto(result);
					setQtaMAX(Math.floor(result.quantita === '1' ? 1 : result.quantita / 2 > 10 ? 10 : result.quantita / 2));
				},
				(error) => {
					console.log(error);
					history.push('/');
				}
			);
	}, []);

	const handleChange = async (e) => {
		setQta(parseInt(e.target.value));
	};

	return (
		<div styleName='wrapper'>
			<div styleName='product-title'>
				<h3>{prodotto.nome}</h3>
			</div>
			<div styleName='product-image'>
				<img src={'http://ecommerce.ideeinbit.it/img/' + prodotto.nome + '.png'} alt='prodotto' />
			</div>
			<div styleName='product-buy'>
				<div styleName='product-price'>
					<h4>Prezzo:</h4>
					<p>€ {prodotto.prezzo}</p>
				</div>

				<div styleName='product-option'>
					<h4>Quantità:</h4>
					<select onChange={handleChange}>
						{Array.from(new Array(qtaMAX), (x, i) => i + 1).map((n) => (
							<option value={n} key={n}>
								{n}
							</option>
						))}
					</select>

					<button
						className='btn btn--block'
						onClick={() =>
							dispatch(
								addToCart({
									idProdotto: prodotto.idProdotto,
									quantita: qta
								})
							)
						}
					>
						ADD TO CART
					</button>
				</div>
			</div>
			<div styleName='product-description'>
				<h4>Descrizione</h4>
				<p>{ReactHtmlParser(prodotto.descL)}</p>
			</div>
		</div>
	);
}

export default CSSModules(DettaglioProdotto, styles, { allowMultiple: true });
