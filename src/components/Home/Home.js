import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Home.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Carousel, Col } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';
import { addToCart, removeAllToCart } from '../../actions';

function Home() {
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const cartRedux = useSelector((state) => state.cart);
	const history = useHistory('/');
	const dispatch = useDispatch();
	const { getCurrentUserEmail } = useAuth();
	const [a, setA] = useState({ idProdotto: 0, path: 'ffffff.png' });
	const [b, setB] = useState({ idProdotto: 0, path: 'ffffff.png' });
	const [c, setC] = useState({ idProdotto: 0, path: 'ffffff.png' });

	useEffect(() => {
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setA(data);
			});
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setB(data);
			});
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setC(data);
			});

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
							history.push('/');
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
								history.push('/');
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
	}, [setA, setB, setC]);

	return (
		<>
			<div styleName='container'>
				<Carousel controls={false}>
					<Carousel.Item autoPlay={true} interval={2000} controls={false}>
						<img className='d-block w-100' src={'/img/' + a.path} alt='First slide' onClick={() => history.push('/shop/' + a.idProdotto)} />
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{a.nome}</h3>
							<p>{a.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item autoPlay={true} interval={2000} controls={false}>
						<Link to={'shop' + b.idProdotto}>
							<img className='d-block w-100' src={'/img/' + b.path} alt='Second slide' onClick={() => history.push('/shop/' + b.idProdotto)} />
						</Link>
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{b.nome}</h3>
							<p>{b.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item autoPlay={true} interval={2000} controls={false}>
						<Link to={'shop' + c.idProdotto}>
							<img className='d-block w-100' src={'/img/' + c.path} alt='Third slide' onClick={() => history.push('/shop/' + c.idProdotto)} />
						</Link>
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{c.nome}</h3>
							<p>{c.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
			<Col className='md-12 text-center mt-2'>
				<Link to='/shop' className='btn btn-primary text-center'>
					Visita il catalogo
				</Link>
			</Col>
		</>
	);
}

export default CSSModules(Home, styles, { allowMultiple: true });
