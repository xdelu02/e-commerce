import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './OrdiniAdmin.module.scss';

function OrdiniAdmin({ idOrdine, idCliente, indirizzo, codice }) {
	return (
		<table styleName="test">
			<tbody>
				<tr>
					<th>{idOrdine}</th>
					<th>{idCliente}</th>
					<th>{indirizzo}</th>
					<th>{codice}</th>
				</tr>
			</tbody>
		</table>
	);
}

export default CSSModules(OrdiniAdmin, styles, { allowMultiple: true });