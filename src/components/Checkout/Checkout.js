import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Row } from '@themesberg/react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Datas from './Datas/Datas';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllToCart } from '../../actions';

function Checkout() {
	const history = useHistory('/checkout');
	const cartRedux = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	const [done, setDone] = useState(false);
	const [ind, setInd] = useState('');
	const [numeroCivico, setNumeroCivico] = useState('');
	const [cap, setCap] = useState('');
	const [citta, setCitta] = useState('');
	const [stato, setStato] = useState('Italia');

	const handleInd = (e) => {
		setInd(e.target.value);
	};
	const handleNCivico = (e) => {
		setNumeroCivico(e.target.value);
	};
	const handleCap = (e) => {
		setCap(e.target.value);
	};
	const handleCitta = (e) => {
		setCitta(e.target.value);
	};
	const handleStato = (e) => {
		setStato(e.target.value);
	};

	class Success extends React.Component {
		//const { getCurrentUserEmail } = useAuth();

		componentDidMount() {
			fetch('/api/carrelli/', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idCliente: 'djdjd@it.it', //getCurrentUserEmail,
					indirizzo: ind + ' ' + numeroCivico + ', ' + cap + ', ' + citta + ', ' + stato,
					importo: cart.length ? parseFloat(cart.reduce((acc, item) => acc + item.quantita * item.prezzo, 0)).toFixed(2) : Number(0).toFixed(2)
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.message === 'Carrello was updated.') {
						dispatch(removeAllToCart());
						localStorage.setItem('cart', JSON.stringify(cartRedux));
						history.push('/success');
					} else {
						history.push('/404');
					}
				})
				.catch(() => history.push('/404'));
		}

		render() {
			return (
				<div>
					<Row>
						<Col className='md-12 text-center'>Pagamento avvenuto con successo!</Col>
					</Row>
					<Row>
						<Col className='md-12 text-center'>
							<Link to='/shop' className='btn btn-primary text-center'>
								Torna al catalogo
							</Link>
						</Col>
					</Row>
				</div>
			);
		}
	}

	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('cart')).length) {
			window.location.href = '/shop';
		}
	}, []);

	return (
		<div>
			{done ? (
				<Success />
			) : (
				<Datas
					cart={cart}
					setDone={setDone}
					ind={ind}
					numeroCivico={numeroCivico}
					cap={cap}
					citta={citta}
					stato={stato}
					handleInd={handleInd}
					handleNCivico={handleNCivico}
					handleCap={handleCap}
					handleCitta={handleCitta}
					handleStato={handleStato}
				/>
			)}
		</div>
	);
}

export default Checkout;
