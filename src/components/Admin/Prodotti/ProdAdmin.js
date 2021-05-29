import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';
import { Link } from 'react-router-dom';

function ProdAdmin({ idProdotto, nome, quantita, prezzo, path }) {
	return (
		<Link to={'/admin/prodotti/' + idProdotto} styleName='product-card' className='card w-100'>
			<img src={'/img/' + path} className='card-img-top' alt='...' />
			<div className='card-body'>
				<h5 className='card-title'>{nome}</h5>
				<div className='card-text'>
					<div>
						<label className='fw-bolder'>Quantità: </label>
						<label>&nbsp;{quantita}</label>
					</div>
					<div className='mt-3'>
						<label className='fw-bolder'>Prezzo: </label>
						<label>&nbsp;&euro;{prezzo}</label>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
