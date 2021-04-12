import React from 'react';
import { Link } from 'react-router-dom';
import "./Prodotto.css";

function Prodotto(props) {
	return (
		<Link to={"/shop/"+props.id} style={{ textDecoration: 'none' }}>
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
		</Link>
	);
}

export default Prodotto;