import React from 'react';
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
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/?key=' + this.state.key)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message === 'No matching Prodotti found.') {
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
		this.setState({
			key: event.target.value
		});
		this.load();
	};

	render() {
		return (
			<main className='shop-container'>
				<div className='wrapper'>
					<input type='text' onChange={this.filter} className='search-bar' placeholder='Search here...' />
					<div className='auto-grid'>
						{this.state.prodotti
							.filter((val) => {
								if (val.quantita > 0) return val;
								else return null;
							})
							.map((e, index) => (
								<Prodotto id={e.idProdotto} path={'http://ecommerce.ideeinbit.it/img/' + e.nome + '.png'} prezzo={e.prezzo} titolo={e.nome} descS={e.descS} key={index} />
							))}
					</div>
				</div>
			</main>
		);
	}
}

export default Shop;
