import React from 'react';
import "./Prodotto.css";

function Prodotto(props) {
	return (
		<div className="prodotto" id={props.id}>
			<img src={props.path} alt="prodotto"/>
			<div className="flex">
				<div className="descrizzione">
					<p className="prezzo">{props.prezzo} €</p><br/>
					<p className="titolo">{props.titolo}</p>
					<p className="descS">{props.descS}</p>
				</div>
				<div className="buttons">
					<button className="btn-addtocart2">ADD TO CART</button>
				</div>
			</div>
		</div>
	);
}

export default Prodotto;