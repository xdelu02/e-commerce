import React from 'react';
import {Link} from 'react-router-dom';
import './Prodotto.scss';

function Prodotto(props) {
	return (
		<Link className="card" to={'/shop/' + props.id}>
			<div id={props.id}>
				<img src={props.path} alt="prodotto" className="product-image" />
				<div className="flex">
					<div className="descrizione">
						<p className="prezzo">{props.prezzo} €</p>
						<br />
						<p className="titolo">{props.titolo}</p>
						<p className="descS">{props.descS}</p>
					</div>
					<div className="container_btn_add_to_cart">
						<button type="button" className="btn btn--block btn--down-br">
							ADD TO CART
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Prodotto;
