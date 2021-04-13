import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import "./DettaglioProdotto.css";

function DettaglioProdotto({ match }) {
	useEffect(() => {
		getProdotto();
	});

	const [prodotto, setProdotto] = useState({
		nome: "logo"
	});

	const getProdotto = async () => {	
		const getProdotto = await fetch(
			"https://localhost/API/api/prodotti/"+match.params.id
		);

		const item = await getProdotto.json();
		setProdotto(item);
	}

	return (
		<div className="dettaglioprodotto flex" id={prodotto.idProdotto}>
			<div className="section1">
				<div>
					<img src={"http://localhost/API/img/"+prodotto.nome+".png"} alt="prodotto"/>
				</div>
				<div className="details">
					<h1 className="titolo m">{prodotto.nome}</h1>
					<h2 className="prezzo m">€ {prodotto.prezzo}</h2>
					<p className="descS m">{prodotto.descS}</p>
					<button className="btn-addtocart">ADD TO CHART <FontAwesomeIcon className="fa" icon={faCartArrowDown} aria-hidden="true"></FontAwesomeIcon></button>
				</div>
			</div>
			<div className="section2">
				<h3>Descrizione</h3>
				<p>{prodotto.descL}</p>
			</div>
		</div>
	);
}

export default DettaglioProdotto;