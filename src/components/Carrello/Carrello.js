import React, { useEffect } from 'react';
import { useAsync } from 'react-async';
import ProdCart from './ProdCart/ProdCart';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Card, Button, Container, Row, Col } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import arrow from '../../assets/icons/left-arrow.png';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeAllToCart } from '../../actions';

function Carrello() {
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const cartRedux = useSelector((state) => state.cart);
	const history = useHistory('/carrello');
	const dispatch = useDispatch();
	const { getCurrentUserEmail } = useAuth();

	const fetchProd = async ({ id }, { signal }) => {
		const response = await fetch('/api/prodotti/' + id, { signal });
		if (!response.ok) throw new Error(response.status);
		return response.json();
	};

	const Prodotto = ({ id }) => {
		const { data, error } = useAsync({ promiseFn: fetchProd, id });
		if (error) {
			console.log(error.message);
		}
		return data ? <ProdCart id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} cart={cart} path={data.path} quantitaMax={data.quantita} /> : null;
	};

	const handleOnClick = () => {
		history.push('/checkout');
	};

	useEffect(() => {
		if (getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') {
			fetch('/api/carrelli/?email=' + getCurrentUserEmail())
				.then((res) => res.json())
				.then((result) => {
					if (result.message === 'No Carrello found.') {
						fetch('/api/carrelli/', {
							method: 'POST',
							body: JSON.stringify({
								idCliente: getCurrentUserEmail()
							})
						})
							.then((re) => re.json())
							.then((resul) => console.log(resul))
							.catch((err) => {
								console.log(err);
								history.push('/404');
							});
					} else {
						if (cart.length) {
							dispatch(removeAllToCart());
							localStorage.setItem('cart', JSON.stringify([]));
							history.push('/carrello');
						}
						fetch('/api/dettaglioordine/?codice=' + result.records[0].codice)
							.then((r) => r.json())
							.then((resu) => {
								resu.records.forEach((element) => {
									dispatch(
										addToCart({
											idProdotto: element.idProdotto,
											quantita: parseInt(element.quantita),
											prezzo: parseFloat(element.prezzoU)
										})
									);
									localStorage.setItem('cart', JSON.stringify(cartRedux));
								});
								history.push('/carrello');
							})
							.catch((err) => {
								console.log(err);
								localStorage.setItem('cart', JSON.stringify([]));
							});
					}
				})
				.catch((err) => {
					console.log(err);
					history.push('/404');
				});
		}
	}, []);

	return (
		<Container>
			<h3 className='mt-5'>Carrello</h3>
			<div>
				<Card border='light' className='shadow-sm'>
					<Card.Body>
						<div>
							{cart.length ? (
								cart.map((e, i) => <Prodotto id={e.idProdotto} key={i} />)
							) : (
								<Link to={'/shop'}>
									<div className='text-center'>Il tuo carrello risulta vuoto.</div>
								</Link>
							)}
						</div>
					</Card.Body>
				</Card>
			</div>

			<div>
				<Row style={{ marginTop: '0.5rem' }}>
					<Col>
						{cart.length ? (
							<Link to={'/shop'}>
								<p>
									<img src={arrow} style={{ width: '20px', height: '20px' }} alt='' />
									Torna al catalogo
								</p>
							</Link>
						) : null}
					</Col>
					<Col>
						<p className='text-end'>
							Totale: <b style={{ color: '#262b40' }}>{cart.length ? cart.reduce((acc, item) => acc + item.quantita * item.prezzo, 0).toFixed(2) : Number(0).toFixed(2)} €</b>
						</p>
					</Col>
				</Row>
				<Row>
					<div className='text-end'>
						{getCurrentUserEmail() !== null && getCurrentUserEmail() !== '' ? (
							cart.length ? (
								<Button onClick={handleOnClick}>Procedi al pagamento</Button>
							) : (
								<Link to={'/shop'}>
									<div className='text-center'>Vai al catalogo</div>
								</Link>
							)
						) : (
							<Button href='/login'>Esegui il login</Button>
						)}
					</div>
				</Row>
			</div>
		</Container>
	);
}

export default Carrello;
