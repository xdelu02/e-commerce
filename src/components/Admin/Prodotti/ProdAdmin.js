import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';
import { Link } from 'react-router-dom';

function ProdAdmin({ idProdotto, nome, quantita, prezzo }) {
	return (
		<Link to={'/admin/prodotti/' + idProdotto} styleName='product-card' className='card'>
			<img src={'http://ecommerce.ideeinbit.it/img/' + nome + '.png'} className='card-img-top' alt='...' />
			<div className='card-body'>
				<h5 className='card-title'>{nome}</h5>
				<p>Quantita</p>
				<p>{quantita}</p>
				<p>Prezzo</p>
				<p>{prezzo} €</p>
			</div>
		</Link>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });

