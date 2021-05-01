import React from 'react';

export default function OrdiniAdmin({ idOrdine, idCliente, indirizzo, codice }) {
	return (
		<>
			<tbody>
				<tr>
					<th>{idOrdine}</th>
					<th>{idCliente}</th>
					<th>{indirizzo}</th>
					<th>{codice}</th>
				</tr>
			</tbody>
		</>
	);
}
