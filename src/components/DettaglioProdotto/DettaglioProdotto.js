import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { addToCart } from '../../actions';
import { useHistory } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './DettaglioProdotto.module.scss';
import { Button, Form } from '@themesberg/react-bootstrap';

function DettaglioProdotto(props) {
	const cart = useSelector((state) => state.cart);
	const [prodotto, setProdotto] = useState({ nome: 'logo' });
	const [qtaMAX, setQtaMAX] = useState(1);
	const [qta, setQta] = useState(1);
	const dispatch = useDispatch();
	const history = useHistory('/shop');
	let id = props.match.params.id;
	const [a, setA] = useState({ idProdotto: 0, path: 'logo-noname.png' });
	const [b, setB] = useState({ idProdotto: 0, path: 'logo-noname.png' });
	const [c, setC] = useState({ idProdotto: 0, path: 'logo-noname.png' });
	const [d, setD] = useState({ idProdotto: 0, path: 'logo-noname.png' });

	useEffect(() => {
		fetch('/api/prodotti/' + id)
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
					history.push('/');
				}
			);
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
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setD(data);
			});
	}, [id, history]);

	const handleChange = async (e) => {
		setQta(parseInt(e.target.value));
	};

	return (
		<div className='container'>
			<h1 className='my-4'>{prodotto.nome}</h1>

			<div className='row'>
				<div className='col-md-8'>
					<img className='img-fluid' src={'/img/' + prodotto.path} alt='' />
				</div>

				<div className='col-md-4'>
					<h3 className='my-3'>Descrizione prodotto</h3>
					<p>{ReactHtmlParser(prodotto.descL)}</p>
					<p>
						Prezzo: <span className='fw-bolder'>€ {prodotto.prezzo}</span>
					</p>

					<Form.Group className='mb-3'>
						<Form.Label>Quantità:</Form.Label>
						<Form.Select onChange={handleChange} className='w-25'>
							{Array.from(new Array(qtaMAX), (x, i) => i + 1).map((n) => (
								<option value={n} key={n}>
									{n}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Button
						className='mt-4'
						onClick={() => {
							dispatch(
								addToCart({
									idProdotto: prodotto.idProdotto,
									quantita: qta,
									prezzo: prodotto.prezzo
								})
							);
							localStorage.setItem('cart', JSON.stringify(cart));
						}}
					>
						Aggiungi al carrello
					</Button>
				</div>
			</div>
			<h3 className='my-4'>Potrebbero interessarti</h3>

			<div className='row'>
				<div className='col-md-3 col-sm-6 mb-4'>
					<img className='img-fluid' styleName='height-max' src={'/img/' + a.path} alt='' onClick={() => history.push('/shop/' + a.idProdotto)} />
				</div>

				<div className='col-md-3 col-sm-6 mb-4'>
					<img className='img-fluid' styleName='height-max' src={'/img/' + b.path} alt='' onClick={() => history.push('/shop/' + b.idProdotto)} />
				</div>

				<div className='col-md-3 col-sm-6 mb-4'>
					<img className='img-fluid' styleName='height-max' src={'/img/' + c.path} alt='' onClick={() => history.push('/shop/' + c.idProdotto)} />
				</div>

				<div className='col-md-3 col-sm-6 mb-4'>
					<img className='img-fluid' styleName='height-max' src={'/img/' + d.path} alt='' onClick={() => history.push('/shop/' + d.idProdotto)} />
				</div>
			</div>
		</div>
	);
}

export default CSSModules(DettaglioProdotto, styles, { allowMultiple: true });
