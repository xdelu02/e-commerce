import { React, useState } from 'react';
import { Col, Row, Card, Form, Button, Container } from '@themesberg/react-bootstrap';
import { useAsync } from 'react-async';
import Toast from 'react-bootstrap/Toast';
import ProdCheckout from '../Prod/ProdCheckout';
import PayPal from '../PayPal/PayPal';

const Datas = ({ cart, setDone, ind, numeroCivico, cap, citta, stato, handleInd, handleNCivico, handleCap, handleCitta, handleStato }) => {
	const [compileForm, setCompileForm] = useState(true);
	const [toast, setToast] = useState(false);
	const toggleToast = () => setToast(!toast);

	const fetchProd = async ({ id }, { signal }) => {
		const response = await fetch('/api/prodotti/' + id, { signal });
		if (!response.ok) throw new Error(response.status);
		return response.json();
	};

	const Prodotto = ({ id }) => {
		const { data, error } = useAsync({ promiseFn: fetchProd, id });
		if (error) {
			console.log(error.message);
		}
		return data ? <ProdCheckout id={data.idProdotto} nome={data.nome} descS={data.descS} prezzo={data.prezzo} cart={cart} path={data.path} /> : null;
	};

	return (
		<>
			<Container>
				<h3 className='mt-5'>Checkout</h3>
				<Card border='light' className='shadow-sm'>
					<Card.Body>
						<Row>
							{compileForm ? (
								<Col xl={6}>
									{cart.map((e, i) => (
										<Prodotto id={e.idProdotto} key={i} />
									))}
								</Col>
							) : null}

							<Col xl={6}>
								<Form>
									<Row>
										<Col md={6} className='mb-3'>
											<Form.Group>
												<Form.Label>Indirizzo</Form.Label>
												{compileForm ? (
													<Form.Control required type='text' value={ind} placeholder='Via del Filarete' onChange={handleInd} />
												) : (
													<Form.Control required type='text' value={ind} placeholder='Via del Filarete' readOnly />
												)}
											</Form.Group>
										</Col>
										<Col md={3} className='mb-3'>
											<Form.Group>
												<Form.Label>N. civico</Form.Label>
												{compileForm ? (
													<Form.Control required type='text' value={numeroCivico} placeholder='17' onChange={handleNCivico} />
												) : (
													<Form.Control required type='text' value={numeroCivico} placeholder='17' readOnly />
												)}
											</Form.Group>
										</Col>
										<Col md={3} className='mb-3'>
											<Form.Group>
												<Form.Label>CAP</Form.Label>
												{compileForm ? (
													<Form.Control required type='text' value={cap} placeholder='50143' onChange={handleCap} />
												) : (
													<Form.Control required type='text' value={cap} placeholder='50143' readOnly />
												)}
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md={6} className='mb-3'>
											<Form.Group>
												<Form.Label>Città</Form.Label>
												{compileForm ? (
													<Form.Control required type='text' value={citta} placeholder='Firenze' onChange={handleCitta} />
												) : (
													<Form.Control required type='text' value={citta} placeholder='Firenze' readOnly />
												)}
											</Form.Group>
										</Col>
										<Col md={6} className='mb-3'>
											<Form.Group>
												<Form.Label>Stato</Form.Label>
												{compileForm ? (
													<Form.Control required type='text' value={stato} placeholder='Italia' onChange={handleStato} readOnly />
												) : (
													<Form.Control required type='text' value={stato} placeholder='Italia' readOnly />
												)}
											</Form.Group>
										</Col>
									</Row>
									<Row className='d-flex justify-content-center'>
										{compileForm ? (
											<Button
												variant='primary'
												onClick={() => {
													if (ind !== '' && numeroCivico !== '' && cap !== '' && citta !== '' && stato !== '') {
														setCompileForm(false);
													} else {
														setToast(true);
													}
												}}
											>
												Salva
											</Button>
										) : (
											<Button
												variant='primary'
												onClick={() => {setCompileForm(true);
												}}
											>
												Annulla
											</Button>
										)}
									</Row>
								</Form>
							</Col>
							{!compileForm ? (
								<Col xl={6}>
									<PayPal cart={cart} setDone={setDone} />
								</Col>
							) : null}
						</Row>
					</Card.Body>
				</Card>
			</Container>
			<Col className='md-4'>
				<Toast show={toast} onClose={toggleToast} className='position-asolute fixed-bottom' style={{ marginLeft: '1rem', marginBottom: '1rem' }} delay={3000} autohide>
					<Toast.Header closeLabel='' closeButton={false}>
						<Col>
							<strong className='mr-auto text-danger'>Campi vuoti!</strong>
						</Col>
						<Col className='text-end'>
							<strong className='text-primary' onClick={toggleToast}>
								X
							</strong>
						</Col>
					</Toast.Header>
					<Toast.Body>Per favore riempire tutti i campi per contuinuare con l'acquisto.</Toast.Body>
				</Toast>
			</Col>
		</>
	);
};

export default Datas;
