import React from 'react';

export default function ProdAdmin({ idProdotto, nome, descS, descL, quantita, prezzo }) {
	return (
		<>
			<tbody>
				<tr>
					<th>{idProdotto}</th>
					<th>{nome}</th>
					<th>{descS}</th>
					<th>{descL}</th>
					<th>{quantita}</th>
					<th>{prezzo} €</th>
				</tr>
			</tbody>
		</>
	);
}