import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';

function ProdAdmin({ idProdotto, nome, quantita, prezzo }) {
	return (
		<div styleName='product-card'>
			<img src={'http://ecommerce.ideeinbit.it/img/' + nome + '.png'} />
			<h4>{nome}</h4>
			<p styleName='desc'>Quantita</p>
			<p>{quantita}</p>
			<p styleName='desc'>Prezzo</p>
			<p>{prezzo} €</p>
		</div>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
