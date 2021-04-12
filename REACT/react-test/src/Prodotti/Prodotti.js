import React from 'react';
import Prodotto from './Prodotto/Prodotto';
import "./Prodotti.css";

class Prodotti extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			prodotti: []
		};
	}

	componentDidMount () {	
		fetch("https://localhost/API/api/prodotti/")
		.then(res => res.json())
		.then(
			(result) => { this.setState({ prodotti: result.records }) },
			(error) => { console.log(error); }
		);
	}

	render () {
		return (
			<div className="prodotti">
				{this.state.prodotti.map((e, index) => <Prodotto id={e.idProdotto} path={"http://localhost/API/img/"+e.nome+".png"} prezzo={e.prezzo} titolo={e.nome} descS={e.descS} key={index} />)}
			</div>
		);
	};
}

export default Prodotti;