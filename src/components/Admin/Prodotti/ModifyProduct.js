import React, { useState } from 'react';
import { Col, Row, Card, Form, Button, Image } from '@themesberg/react-bootstrap';
import { useDropzone } from 'react-dropzone';

export default function ModifyProduct() {
	const id = parseInt(window.location.pathname.replace(/^\D+/g, ''), 10);
	const [nome, setNome] = useState('');
	const [descS, setDescS] = useState('');
	const [descL, setDescL] = useState('');
	const [categoria, setCategoria] = useState('');
	const [prezzo, setPrezzo] = useState('');
	const [qta, setQta] = useState(0);

	const sendProductData = () => {
		console.log('LAVORA QUA FERI La FUNZIONE è già linkata al battone Salva');
	};

	const handleNome = (e) => {
		setNome(e.target.value);
	};
	const handleDescS = (e) => {
		setDescS(e.target.value);
	};
	const handleDescL = (e) => {
		setDescL(e.target.value);
	};
	const handlePrezzo = (e) => {
		setPrezzo(e.target.value);
	};
	const handleCategoria = (e) => {
		setCategoria(e.target.value);
	};
	const handleQta = (e) => {
		setQta(parseInt(e.target.value, 10));
	};

	return (
		<Card border='light' className='bg-white shadow-xs mb-4 mt-3'>
			<Card.Body>
				<h5 className='mb-4'>Informazioni prodotto</h5>
				<Form>
					<Row>
						<Col md={2} className='mb-3'>
							<Form.Group>
								<Form.Label>ID</Form.Label>
								<Form.Control required type='text' readOnly />
							</Form.Group>
						</Col>
						<Col md={4} className='mb-3'>
							<Form.Group>
								<Form.Label>Nome prodotto</Form.Label>
								<Form.Control required type='text' onChange={handleNome} />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6} className='mb-3'>
							<Form.Group>
								<Form.Label>Descrizione corta</Form.Label>
								<Form.Control required as='textarea' rows={3} onChange={handleDescS} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6} className='mb-3'>
							<Form.Group>
								<Form.Label>Descrizione lunga</Form.Label>
								<Form.Control required as='textarea' rows={3} onChange={handleDescL} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={3}>
							<Form.Group>
								<Form.Label>Categoria</Form.Label>
								<Form.Control required type='text' onChange={handleCategoria} />
							</Form.Group>
						</Col>

						<Col sm={2} className='mb-3'>
							<Form.Group>
								<Form.Label>Prezzo</Form.Label>
								<Form.Control required type='text' onChange={handlePrezzo} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={2}>
							<Form.Group>
								<Form.Label>Quantità</Form.Label>
								<Form.Control required type='number' onChange={handleQta} />
							</Form.Group>
						</Col>
					</Row>
					<div className='mt-4'>
						<Button variant='primary' type='submit' onClick={sendProductData}>
							Salva
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}
