import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProdAdmin.module.scss';

function ProdAdmin({ idProdotto, nome, descS, descL, quantita, prezzo }) {
	return (
		<tbody styleName='prod-admin'>
			<tr>
				<th>{idProdotto}</th>
				<th>{nome}</th>
				<th>{descS}</th>
				<th>{descL}</th>
				<th>{quantita}</th>
				<th>{prezzo} €</th>
			</tr>
		</tbody>
	);
}

export default CSSModules(ProdAdmin, styles, { allowMultiple: true });
