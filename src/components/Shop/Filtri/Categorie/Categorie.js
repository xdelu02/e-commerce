import React from 'react';
import Categoria from './Categoria/Categoria';
import "./Categorie.scss";

class Categorie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			categorie: []
		};
	}

	componentDidMount () {
		fetch("https://ecommerce.ideeinbit.it/api/categorie/")
		.then(res => res.json())
		.then(
			(result) => { this.setState({ categorie: result.records }) },
			(error) => { console.log(error); }
		);
	}

	render () {
		return (
			<div className="categorie">
				<p className="title">Categorie</p>
				{this.state.categorie.map((e, i) => <Categoria categoria={e.idCategoria} key={i} />)}
			</div>
		);
	};
}

export default Categorie;