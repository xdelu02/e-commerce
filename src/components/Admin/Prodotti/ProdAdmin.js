import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';

function ProdAdmin({ idProdotto, nome, descS, quantita, prezzo }) {
	return (
		<div styleName='prod-admin'>
			<div>{idProdotto}</div>
			<div>{nome}</div>
			<div>{descS}</div>
			<div>{quantita}</div>
			<div>{prezzo} €</div>
		</div>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
