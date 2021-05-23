import React from 'react';
import { useAsync } from 'react-async';
import ProdCart from './ProdCart/ProdCart';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Card, Button, Container, Row, Col } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import arrow from '../../assets/icons/left-arrow.png';

function Carrello() {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const history = useHistory('/carrello');
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
		return data ? <ProdCart id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} cart={cart} path={data.path} /> : null;
	};

	const handleOnClick = () => {
		history.push('/checkout');
	};

	return (
		<Container>
			<h3 className='mt-5'>Carrello</h3>
			<div>
				<Card border='light' className='shadow-sm'>
					<Card.Body>
						{cart.length ? (
							cart.map((e, i) => <Prodotto id={e.idProdotto} key={i} />)
						) : (
							<Link to={'/shop'}>
								<div className='text-center'>Vai al catalogo</div>
							</Link>
						)}
					</Card.Body>
				</Card>
			</div>

			<div>
				<Row style={{ marginTop: '0.5rem' }}>
					<Col>
						{cart.length ? (
							<Link to={'/shop'}>
								<p>
									<img src={arrow} style={{ width: '20px', height: '20px' }}></img>Torna al catalogo
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
							<Button onClick={handleOnClick}>Procedi al pagamento</Button>
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
