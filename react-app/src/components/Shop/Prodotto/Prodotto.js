import React from 'react';
import {Link} from 'react-router-dom';
import './Prodotto.scss';

function Prodotto(props) {
	return (
		<Link className="product-wrapper" to={'/shop/' + props.id}>
			<img src={props.path} alt="prodotto" className="product-image" />
			<p className="title">{props.titolo}</p>
			<p className="descS">{props.descS}</p>
			<p className="price">{props.prezzo} €</p>
			<button type="button" className="btn btn--block btn--down-br">
				ADD TO CART
			</button>
		</Link>
	);
}

export default Prodotto;
