import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import './Prodotto.scss';

function Prodotto(props) {
	return (
		<Link to={'/shop/' + props.id} style={{textDecoration: 'none'}}>
			<div className="card" id={props.id}>
				<img src={props.path} alt="prodotto" className="product-image" />
				<div className="flex">
					<div className="descrizzione">
						<p className="prezzo">{props.prezzo} €</p>
						<br />
						<p className="titolo">{props.titolo}</p>
						<p className="descS">{props.descS}</p>
					</div>
					<button type="button" className="btn btn--block btn--down-br">ADD TO CART</button>
				</div>
			</div>
		</Link>
	);
}

export default Prodotto;
