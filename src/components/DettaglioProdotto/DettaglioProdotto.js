import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { addToCart } from '../../actions';
import { useHistory } from 'react-router';

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
		<div className='dettaglioprodotto flex' id={prodotto.idProdotto}>
			<div className='section1'>
				<div>
					<img src={'http://ecommerce.ideeinbit.it/img/' + prodotto.nome + '.png'} alt='prodotto' />
				</div>
				<div className='details'>
					<h1 className='titolo m'>{prodotto.nome}</h1>
					<h2 className='prezzo m'>€ {prodotto.prezzo}</h2>
					<p className='descS m'>{prodotto.descS}</p>
					<div className='custom-select m'>
						<select onChange={handleChange}>
							{Array.from(new Array(qtaMAX), (x, i) => i + 1).map((n) => (
								<option value={n} key={n}>
									{n}
								</option>
							))}
						</select>
					</div>
					<button
						className='btn-addtocart'
						onClick={() =>
							dispatch(
								addToCart({
									idProdotto: prodotto.idProdotto,
									quantita: qta
								})
							)
						}
					>
						ADD TO CHART
					</button>
				</div>
			</div>
			<div className='section2'>
				<h3>Descrizione</h3>
				<p>{ReactHtmlParser(prodotto.descL)}</p>
			</div>
		</div>
	);
}

export default DettaglioProdotto;
