import React from 'react';
import Filtri from './Filtri/Filtri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Prodotto from './Prodotto/Prodotto';
import './Shop.scss';

class Shop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			prodotti: [],
			key: ''
		};
	}

	componentDidMount() {
		this.load();
	}

	load() {
		fetch('https://localhost/API/api/prodotti/?key=' + this.state.key)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message == 'No matching Prodotti found.') {
						this.setState({
							prodotti: []
						});
					} else {
						this.setState({
							prodotti: result.records
						});
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	filter = (event) => {
		this.state.key = event.target.value;
		this.load();
	};

	render() {
		return (
			<div className="all">
				<Filtri />
				<div className="prod">
					<div className="barraricerca">
						<input type="text" name="search" placeholder="Search here..." onChange={this.filter} />
					</div>
					<div className="prodotti">
						{this.state.prodotti
							.filter((val) => {
								if (val.quantita > 0) return val;
							})
							.map((e, index) => (
								<Prodotto id={e.idProdotto} path={'http://localhost/API/img/' + e.nome + '.png'} prezzo={e.prezzo} titolo={e.nome} descS={e.descS} key={index} />
							))}
					</div>
				</div>
			</div>
		);
	}
}

export default Shop;
