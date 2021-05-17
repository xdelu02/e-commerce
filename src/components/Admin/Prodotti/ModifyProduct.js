import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Col, Row, Card, Form, Button, Image } from '@themesberg/react-bootstrap';
import { useDropzone } from 'react-dropzone';

export default function ModifyProduct(props) {
	const [nome, setNome] = useState('');
	const [descS, setDescS] = useState('');
	const [descL, setDescL] = useState('');
	const [categoria, setCategoria] = useState('');
	const [prezzo, setPrezzo] = useState('');
	const [qta, setQta] = useState(0);
	const history = useHistory('/admin/prodotti');
	let id = props.match.params.id;

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

	const sendProductData = () => {
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idProdotto: parseInt(id),
				nome: nome,
				descS: descS,
				descL: descL,
				prezzo: parseFloat(prezzo),
				quantita: parseInt(qta),
				idCategoria: categoria
			})
		})
			.then((response) => response.json())
			.then(() => {
				history.push('/admin/prodotti');
			});
	};

	useEffect(() => {
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/' + id)
			.then((res) => res.json())
			.then(
				(result) => {
					if (!(typeof result.records === 'undefined' || result.records === null)) {
						history.push('/404');
					}
					setNome(result.nome);
					setDescS(result.descS);
					setDescL(result.descL);
					setPrezzo(result.prezzo);
					setCategoria(result.idCategoria);
					setQta(result.quantita);
				},
				(error) => {
					history.push('/admin/prodotti');
				}
			);
	}, [id, history]);

	return (
		<Card border='light' className='bg-white shadow-xs mb-4 mt-3'>
			<Card.Body>
				<h5 className='mb-4'>Informazioni prodotto</h5>
				<Form>
					<Row>
						<Col md={2} className='mb-3'>
							<Form.Group>
								<Form.Label>ID</Form.Label>
								<Form.Control required type='text' value={id} readOnly />
							</Form.Group>
						</Col>
						<Col md={4} className='mb-3'>
							<Form.Group>
								<Form.Label>Nome prodotto</Form.Label>
								<Form.Control required type='text' value={nome} onChange={handleNome} />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6} className='mb-3'>
							<Form.Group>
								<Form.Label>Descrizione corta</Form.Label>
								<Form.Control required as='textarea' rows={3} value={descS} onChange={handleDescS} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6} className='mb-3'>
							<Form.Group>
								<Form.Label>Descrizione lunga</Form.Label>
								<Form.Control required as='textarea' rows={3} value={descL} onChange={handleDescL} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={3}>
							<Form.Group>
								<Form.Label>Categoria</Form.Label>
								<Form.Control required type='text' value={categoria} onChange={handleCategoria} />
							</Form.Group>
						</Col>

						<Col sm={2} className='mb-3'>
							<Form.Group>
								<Form.Label>Prezzo</Form.Label>
								<Form.Control required type='text' value={prezzo} onChange={handlePrezzo} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={2}>
							<Form.Group>
								<Form.Label>Quantità</Form.Label>
								<Form.Control required type='number' value={qta} onChange={handleQta} />
							</Form.Group>
						</Col>
					</Row>
					<div className='mt-4'>
						<Button variant='primary' onClick={sendProductData}>
							Salva
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}
