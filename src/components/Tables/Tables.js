import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { pageVisits, adminUsers } from '../../data/tables';
import transactions from '../../data/transactions';
import commands from '../../data/commands';

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

export const TransactionsTable = () => {
	const totalTransactions = transactions.length;

	const TableRow = (props) => {
		const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
		const statusVariant = status === 'Paid' ? 'success' : status === 'Due' ? 'warning' : status === 'Canceled' ? 'danger' : 'primary';

		return (
			<tr>
				<td>
					<Card.Link as={Link} to={''} className='fw-normal'>
						{invoiceNumber}
					</Card.Link>
				</td>
				<td>
					<span className='fw-normal'>{subscription}</span>
				</td>
				<td>
					<span className='fw-normal'>{issueDate}</span>
				</td>
				<td>
					<span className='fw-normal'>{dueDate}</span>
				</td>
				<td>
					<span className='fw-normal'>${parseFloat(price).toFixed(2)}</span>
				</td>
				<td>
					<span className={`fw-normal text-${statusVariant}`}>{status}</span>
				</td>
				<td>
					<Dropdown as={ButtonGroup}>
						<Dropdown.Toggle as={Button} split variant='link' className='text-dark m-0 p-0'>
							<span className='icon icon-sm'>
								<FontAwesomeIcon icon={faEllipsisH} className='icon-dark' />
							</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item>
								<FontAwesomeIcon icon={faEye} className='me-2' /> View Details
							</Dropdown.Item>
							<Dropdown.Item>
								<FontAwesomeIcon icon={faEdit} className='me-2' /> Edit
							</Dropdown.Item>
							<Dropdown.Item className='text-danger'>
								<FontAwesomeIcon icon={faTrashAlt} className='me-2' /> Remove
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	};

	return (
		<Card border='light' className='table-wrapper table-responsive shadow-sm'>
			<Card.Body className='pt-0'>
				<Table hover className='user-table align-items-center'>
					<thead>
						<tr>
							<th className='border-bottom'>#</th>
							<th className='border-bottom'>Bill For</th>
							<th className='border-bottom'>Issue Date</th>
							<th className='border-bottom'>Due Date</th>
							<th className='border-bottom'>Total</th>
							<th className='border-bottom'>Status</th>
							<th className='border-bottom'>Action</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((t) => (
							<TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
						))}
					</tbody>
				</Table>
				<Card.Footer className='px-3 border-0 d-lg-flex align-items-center justify-content-between'>
					<Nav>
						<Pagination className='mb-2 mb-lg-0'>
							<Pagination.Prev>Previous</Pagination.Prev>
							<Pagination.Item active>1</Pagination.Item>
							<Pagination.Item>2</Pagination.Item>
							<Pagination.Item>3</Pagination.Item>
							<Pagination.Item>4</Pagination.Item>
							<Pagination.Item>5</Pagination.Item>
							<Pagination.Next>Next</Pagination.Next>
						</Pagination>
					</Nav>
					<small className='fw-bold'>
						Showing <b>{totalTransactions}</b> out of <b>25</b> entries
					</small>
				</Card.Footer>
			</Card.Body>
		</Card>
	);
};

export const CommandsTable = () => {
	const TableRow = (props) => {
		const { name, usage = [], description, link } = props;

		return (
			<tr>
				<td className='border-0' style={{ width: '5%' }}>
					<code>{name}</code>
				</td>
				<td className='fw-bold border-0' style={{ width: '5%' }}>
					<ul className='ps-0'>
						{usage.map((u) => (
							<ol key={u} className='ps-0'>
								<code>{u}</code>
							</ol>
						))}
					</ul>
				</td>
				<td className='border-0' style={{ width: '50%' }}>
					<pre className='m-0 p-0'>{description}</pre>
				</td>
				<td className='border-0' style={{ width: '40%' }}>
					<pre>
						<Card.Link href={link} target='_blank'>
							Read More <FontAwesomeIcon icon={faExternalLinkAlt} className='ms-1' />
						</Card.Link>
					</pre>
				</td>
			</tr>
		);
	};

	return (
		<Card border='light' className='shadow-sm'>
			<Card.Body className='p-0'>
				<Table responsive className='table-centered rounded' style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
					<thead className='thead-light'>
						<tr>
							<th className='border-0' style={{ width: '5%' }}>
								Name
							</th>
							<th className='border-0' style={{ width: '5%' }}>
								Usage
							</th>
							<th className='border-0' style={{ width: '50%' }}>
								Description
							</th>
							<th className='border-0' style={{ width: '40%' }}>
								Extra
							</th>
						</tr>
					</thead>
					<tbody>
						{commands.map((c) => (
							<TableRow key={`command-${c.id}`} {...c} />
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};
