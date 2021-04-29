import React from 'react';

export default function ProdAdmin(props) {
	return (
		<>
			<tbody>
				<tr>
					<th>{props.idProdotto}</th>
					<th>{props.nome}</th>
					<th>{props.descS}</th>
					<th>{props.descL}</th>
					<th>{props.quantita}</th>
					<th>{props.prezzo}</th>
				</tr>
			</tbody>
		</>
	);
}