import React from "react";
import "./DettaglioProdotto.css";

class DettaglioProdotto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			id: props.id,
			prodotto: {
				nome: "logo"
			}
		};
	}

	componentDidMount () {	
		fetch("https://localhost/API/api/prodotti/"+this.props.id)
		.then(res => res.json())
		.then(
			(result) => { this.setState({ prodotto: result }) },
			(error) => { console.log(error); }
		);
	}

	render () {
		return (
			<div className="dettaglioprodotto flex" id={this.state.id}>
				<div className="section1">
					<div>
						<img src={"http://localhost/API/img/"+this.state.prodotto.nome+".png"} alt="prodotto"/>
					</div>
					<div className="details">
						<h1 className="titolo m">{this.state.prodotto.nome}</h1>
						<h2 className="prezzo m">€ {this.state.prodotto.prezzo}</h2>
						<p className="descS m">{this.state.prodotto.descS}</p>
						<button className="btn-addtocart">ADD TO CHART</button>
					</div>
				</div>
				<div className="section2">
					<h3>Descrizione</h3>
					<p>{this.state.prodotto.descL}</p>
				</div>
			</div>
		);
	};
}

export default DettaglioProdotto;