import React, { useEffect, useState } from 'react';
import OrdiniAdmin from './OrdiniAdmin';
import CSSModules from 'react-css-modules';
import styles from './Ordini.module.scss';
import { Card, Table } from '@themesberg/react-bootstrap';

const load = (setOrdini) => {
	fetch('http://ecommerce.ideeinbit.it/api/ordini/')
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.message !== 'No Ordini found.') {
					setOrdini(result.records);
				}
			},
			(error) => {
				setOrdini([{}]);
				console.log(error);
			}
		);
};

function Ordini() {
	const [ordini, setOrdini] = useState([]);

	useEffect(() => {
		load(setOrdini);
	}, [load, setOrdini]);

	const TableRow = (props) => {
		const { idOrdine, idCliente, indirizzo, codice } = props;

		return (
			<tr>
				<td>{idOrdine}</td>
				<td>{idCliente}</td>
				<td>{indirizzo}</td>
				<td>{codice}</td>
			</tr>
		);
	};

	return (
		<Card border='light' className='shadow-sm mb-4 mt-2'>
			<Card.Body className='pb-0'>
				<Table responsive className='table-centered table-nowrap rounded mb-0'>
					<thead className='thead-light'>
						<tr>
							<th className='border-0'>#</th>
							<th className='border-0'>Email</th>
							<th className='border-0'>Indirizzo</th>
							<th className='border-0'>Codice</th>
						</tr>
					</thead>
					<tbody>
						{ordini.map((e, i) => (
							<TableRow key={i} idOrdine={e.idOrdine} idCliente={e.idCliente} indirizzo={e.indirizzo} codice={e.codice} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}

export default CSSModules(Ordini, styles, { allowMultiple: true });
