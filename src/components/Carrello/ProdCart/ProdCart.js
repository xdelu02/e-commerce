import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addifnotToCart, removeToCart, updateToCart } from '../../../actions';
import del from '../../../assets/icons/delete-red.png';
import CSSModules from 'react-css-modules';
import styles from './Prod.module.scss';
import { Col } from '@themesberg/react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';

function ProdCart(props) {
	const cartRedux = useSelector((state) => state.cart);
	const cart = props.cart;
	const [qta, setQta] = useState(1);
	const dispatch = useDispatch();
	const history = useHistory('/carrello');
	const { getCurrentUserEmail } = useAuth();

	const removeProd = (e) => {
		dispatch(
			removeToCart({
				idProdotto: e.target.id
			})
		);
		if (getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') {
			fetch('/api/carrelli/?email=' + getCurrentUserEmail())
				.then((res) => res.json())
				.then((result) => {
					fetch('/api/dettaglioordine/?codice=' + result.records[0].codice)
						.then((r) => r.json())
						.then((resu) => {
							resu.records.forEach((element) => {
								if (element.idProdotto === e.target.id) {
									fetch('/api/dettaglioordine/', {
										method: 'DELETE',
										body: JSON.stringify({
											idDettaglioOrdine: element.idDettaglioOrdine
										})
									})
										.catch((err) => {
											console.log(err);
											history.push('/404');
										});
								}
							});
						})
						.catch((err) => {
							console.log(err);
							history.push('/404');
						});
				})
				.catch((err) => {
					console.log(err);
					history.push('/404');
				});
		}
		localStorage.setItem('cart', JSON.stringify(cartRedux));
		history.push('/carrello');
	};

	const updateProd = async (e) => {
		setQta(parseInt(e.target.value));
		dispatch(
			updateToCart({
				idProdotto: e.target.id,
				quantita: parseInt(e.target.value),
				prezzo: props.prezzo
			})
		);
		if (getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') {
			fetch('/api/carrelli/?email=' + getCurrentUserEmail())
				.then((res) => res.json())
				.then((result) => {
					fetch('/api/dettaglioordine/', {
						method: 'PATCH',
						body: JSON.stringify({
							idOrdine: result.records[0].idOrdine,
							idProdotto: e.target.id,
							prezzoU: props.prezzo,
							quantita: parseInt(e.target.value)
						})
					})
						.catch((err) => {
							console.log(err);
							history.push('/404');
						});
				})
				.catch((err) => {
					console.log(err);
					history.push('/404');
				});
		}
		localStorage.setItem('cart', JSON.stringify(cartRedux));
		history.push('/carrello');
	};

	const decrease = async (e) => {
		if (qta > 1) {
			setQta(parseInt(qta - 1));
			dispatch(
				updateToCart({
					idProdotto: e.target.id,
					quantita: parseInt(qta - 1),
					prezzo: props.prezzo
				})
			);
			if (getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') {
				fetch('/api/carrelli/?email=' + getCurrentUserEmail())
					.then((res) => res.json())
					.then((result) => {
						fetch('/api/dettaglioordine/', {
							method: 'PATCH',
							body: JSON.stringify({
								idOrdine: result.records[0].idOrdine,
								idProdotto: e.target.id,
								prezzoU: props.prezzo,
								quantita: parseInt(qta - 1)
							})
						})
							.catch((err) => {
								console.log(err);
								history.push('/404');
							});
					})
					.catch((err) => {
						console.log(err);
						history.push('/404');
					});
			}
			localStorage.setItem('cart', JSON.stringify(cartRedux));
			history.push('/carrello');
		}
	};

	const increase = async (e) => {
		if (qta < props.quantitaMax) {
			setQta(parseInt(qta + 1));
			dispatch(
				updateToCart({
					idProdotto: e.target.id,
					quantita: parseInt(qta + 1),
					prezzo: props.prezzo
				})
			);
			if (getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') {
				fetch('/api/carrelli/?email=' + getCurrentUserEmail())
					.then((res) => res.json())
					.then((result) => {
						fetch('/api/dettaglioordine/', {
							method: 'PATCH',
							body: JSON.stringify({
								idOrdine: result.records[0].idOrdine,
								idProdotto: e.target.id,
								prezzoU: props.prezzo,
								quantita: parseInt(qta + 1)
							})
						})
							.catch((err) => {
								console.log(err);
								history.push('/404');
							});
					})
					.catch((err) => {
						console.log(err);
						history.push('/404');
					});
			}
			localStorage.setItem('cart', JSON.stringify(cartRedux));
			history.push('/carrello');
		}
	};

	useEffect(() => {
		cart.forEach((e) => {
			if (e.idProdotto === props.id) {
				setQta(e.quantita);
				dispatch(
					addifnotToCart({
						idProdotto: props.id,
						quantita: parseInt(e.quantita),
						prezzo: props.prezzo
					})
				);
				return;
			}
		});
	}, [props.id, cart, dispatch, props.prezzo]);

	return (
		<div id={props.id} className={'d-flex align-items-center justify-content-between border-bottom border-light pb-3'}>
			<Col>
				<img src={'/img/' + props.path} alt={props.nome} styleName='prodImage' />
			</Col>
			<Col>
				<p>{props.nome}</p>
			</Col>
			<Col>
				<p>{props.prezzo + '€'}</p>
			</Col>
			<Col>
				<div className='d-flex justify-content-center'>
					<button id={props.id} onClick={decrease} className='btn btn-primary btn-sm' style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
						-
					</button>
					<input id={props.id} type='number' onChange={updateProd} value={qta} min='1' max={props.quantitaMax} disabled />
					<button id={props.id} onClick={increase} className='btn btn-primary btn-sm' style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
						+
					</button>
				</div>
			</Col>
			<Col xs={1}>
				<img src={del} id={props.id} onClick={(e) => removeProd(e)} alt='' style={{ width: '24px', height: '24px', float: 'right' }} />
			</Col>
		</div>
	);
}

export default CSSModules(ProdCart, styles, { allowMultiple: true });

/*
  pb - 3
  py - 3
  pt-3
*/
