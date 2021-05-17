import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Table } from '@themesberg/react-bootstrap';
import { pageVisits, adminUsers } from '../../data/tables';

export const PageVisitsTable = () => {
	const TableRow = (props) => {
		const { pageName, views, returnValue, bounceRate } = props;
		const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
		const bounceTxtColor = bounceRate < 0 ? 'text-danger' : 'text-success';

		return (
			<tr>
				<th scope='row'>{pageName}</th>
				<td>{views}</td>
				<td>${returnValue}</td>
				<td>
					<FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
					{Math.abs(bounceRate)}%
				</td>
			</tr>
		);
	};

	return (
		<Card border='light' className='shadow-sm'>
			<Card.Header>
				<Row className='align-items-center'>
					<Col>
						<h5>Page visits</h5>
					</Col>
					<Col className='text-end'>
						<Button variant='secondary' size='sm'>
							See all
						</Button>
					</Col>
				</Row>
			</Card.Header>
			<Table responsive className='align-items-center table-flush'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>Page name</th>
						<th scope='col'>Page Views</th>
						<th scope='col'>Page Value</th>
						<th scope='col'>Bounce rate</th>
					</tr>
				</thead>
				<tbody>
					{pageVisits.map((pv) => (
						<TableRow key={`page-visit-${pv.id}`} {...pv} />
					))}
				</tbody>
			</Table>
		</Card>
	);
};

export const AdminManagament = () => {
	const TableRow = (props) => {
		const { id, name, lastName, username, email } = props;

		return (
			<tr>
				<td>
					<Card.Link href='#' className='text-primary fw-bold'>
						{id}
					</Card.Link>
				</td>
				<td>{name}</td>
				<td>{lastName}</td>
				<td>{username}</td>
				<td>{email}</td>
			</tr>
		);
	};

	return (
		<Card border='light' className='shadow-sm mb-4'>
			<Card.Body className='pb-0'>
				<Table responsive className='table-centered table-nowrap rounded mb-0'>
					<thead className='thead-light'>
						<tr>
							<th className='border-0'>#</th>
							<th className='border-0'>Nome</th>
							<th className='border-0'>Cognome</th>
							<th className='border-0'>Username</th>
							<th className='border-0'>E-mail</th>
						</tr>
					</thead>
					<tbody>
						{adminUsers.map((pt) => (
							<TableRow key={`adminUsers-${pt.id}`} {...pt} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};



