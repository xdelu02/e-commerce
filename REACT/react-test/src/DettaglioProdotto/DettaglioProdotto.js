import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import "./DettaglioProdotto.css";

class DettaglioProdotto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			props: props,
			error: null,
			isLoaded: false,
			prodotto: {
				nome: "logo"
			},
			qtaMAX: 1
		};
	}

	componentDidMount () {
		
		fetch("https://localhost/API/api/prodotti/"+this.state.props.match.params.id)
		.then(res => res.json())
		.then(
			(result) => { this.setState({ prodotto: result, qtaMAX: (result.quantita/2 > 10) ? 10 : result.quantita/2 }) },
			(error) => { console.log(error); }
		);
	}
	render () {
		return (
			<div className="dettaglioprodotto flex" id={this.state.prodotto.idProdotto}>
				<div className="section1">
					<div>
						<img src={"http://localhost/API/img/"+this.state.prodotto.nome+".png"} alt="prodotto"/>
					</div>
					<div className="details">
						<h1 className="titolo m">{this.state.prodotto.nome}</h1>
						<h2 className="prezzo m">€ {this.state.prodotto.prezzo}</h2>
						<p className="descS m">{this.state.prodotto.descS}</p>
						<div className="custom-select m">
							<select>
								{(Array.from(new Array(this.state.qtaMAX), (x, i) => i + 1)).map(n => <option value={n} key={n}> {n} </option>)}
							</select>
						</div>
						<button className="btn-addtocart">ADD TO CHART <FontAwesomeIcon className="fa" icon={faCartArrowDown} aria-hidden="true"></FontAwesomeIcon></button>
					</div>
				</div>
				<div className="section2">
					<h3>Descrizione</h3>
					<p>{this.state.prodotto.descL}</p>
				</div>
			</div>
		);
	}
}

export default DettaglioProdotto;