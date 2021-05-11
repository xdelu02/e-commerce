import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';

function ProdAdmin({ idProdotto, nome, descS, quantita, prezzo }) {
	return (
		<div styleName="product-card">
			<p>{idProdotto}</p>
			<p>{nome}</p>
			<p>{quantita}</p>
			<p>{prezzo} €</p>
		</div>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
