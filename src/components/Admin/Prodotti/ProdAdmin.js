import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';
import { Link } from 'react-router-dom';

function ProdAdmin({ idProdotto, nome, quantita, prezzo }) {
	return (
		<Link styleName='product-card' to={'/admin/prodotti/' + idProdotto}>
			<img src={'http://ecommerce.ideeinbit.it/img/' + nome + '.png'} alt='' />
			<h4>{nome}</h4>
			<p styleName='desc'>Quantita</p>
			<p>{quantita}</p>
			<p styleName='desc'>Prezzo</p>
			<p>{prezzo} €</p>
		</Link>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
