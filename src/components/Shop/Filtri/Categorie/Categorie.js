import React from 'react';
import Categoria from './Categoria/Categoria';
import { Form } from '@themesberg/react-bootstrap';

class Categorie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			categorie: []
		};
		this.handleCategorie = (cat) => {props.handleCategorie(cat)};
	}

	componentDidMount() {
		fetch('/api/categorie/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'No Categorie found.') {
						this.setState({ categorie: result.records });
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	render() {
		return (
			<div className='categorie mt-4 ms-1'>
				<h5>Categorie</h5>
				<Form>
					{this.state.categorie.map((e, i) => (
						<Categoria categoria={e.idCategoria} identificativo={i} key={i} handleCategorie={this.handleCategorie} />
					))}
				</Form>
			</div>
		);
	}
}

export default Categorie;
