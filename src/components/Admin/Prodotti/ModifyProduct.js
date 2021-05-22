import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Col, Row, Card, Form, Button, Image } from '@themesberg/react-bootstrap';
import { useDropzone } from 'react-dropzone';
import CSSModules from 'react-css-modules';
import styles from './ModifyProduct.module.scss';
import './general.scss';

function ModifyProduct(props) {
	const [nome, setNome] = useState('');
	const [descS, setDescS] = useState('');
	const [descL, setDescL] = useState('');
	const [categoria, setCategoria] = useState('');
	const [prezzo, setPrezzo] = useState('');
	const [qta, setQta] = useState(0);
	const [files, setFiles] = useState([]);
	const [dropZoneClass, setDropZoneClass] = useState('');
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
		fetch('/api/prodotti/', {
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

	const deleteProduct = () => {
		fetch('/api/prodotti/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idProdotto: parseInt(id)
			})
		})
			.then((response) => response.json())
			.then(() => {
				history.push('/admin/prodotti');
			});
	};

	useEffect(() => {
		fetch('/api/prodotti/' + id)
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

	const handleImage = () => {
		dropZoneClass === 'hide' ? setDropZoneClass('') : setDropZoneClass('hide');
	};

	const reRender = () => {
		window.location.reload();
	};

	const Dropzone = () => {
		const { getRootProps, getInputProps } = useDropzone({
			accept: 'image/*',
			onDrop: (files) => {
				setFiles(
					files.map((file) => ({
						...file,
						preview: URL.createObjectURL(file)
					}))
				);
				handleImage();
			}
		});

		const DropzoneFile = (props) => {
			const { path, preview } = props;

			return (
				<>
					<Col xl={6} className='dropzone-preview d-flex justify-content-center'>
						<Image src={preview} className='image-dropzone-admin' />
					</Col>
					<Row className='d-flex justify-content-center align-items-center'>
						<Button onClick={reRender} className='btn-immagine'>
							Cambia immagine
						</Button>
					</Row>
				</>
			);
		};

		return (
			<>
				<Form {...getRootProps({ className: `dropzone rounded d-flex align-items-center justify-content-center mb-4 mt-4 ${dropZoneClass}` })}>
					<Form.Control {...getInputProps()} />
					<div className='dz-default dz-message text-center'>
						<p className='dz-button mb-0'>Carica l'immagine</p>
					</div>
				</Form>
				<Row className='dropzone-files d-flex align-items-center justify-content-center'>
					{files.map((file) => (
						<DropzoneFile key={file.path} {...file} />
					))}
				</Row>
			</>
		);
	};

	return (
		<Card border='light' className='bg-white shadow-xs mb-4 mt-3'>
			<Card.Body>
				<h5 className='mb-4'>Informazioni prodotto</h5>
				<Row styleName='wrapper'>
					<Col sm={12} styleName='dropzone'>
						<Dropzone></Dropzone>
					</Col>
					<Col xl={6}>
						<Form>
							<Row>
								<Col md={3} className='mb-3'>
									<Form.Group styleName='id'>
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
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Descrizione corta</Form.Label>
										<Form.Control required as='textarea' rows={3} value={descS} onChange={handleDescS} />
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Descrizione lunga</Form.Label>
										<Form.Control required as='textarea' rows={3} value={descL} onChange={handleDescL} />
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Categoria</Form.Label>
										<Form.Control required type='text' value={categoria} onChange={handleCategoria} />
									</Form.Group>
								</Col>

								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Prezzo</Form.Label>
										<Form.Control required type='text' value={prezzo} onChange={handlePrezzo} />
									</Form.Group>
								</Col>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Quantità</Form.Label>
										<Form.Control required type='number' value={qta} onChange={handleQta} />
									</Form.Group>
								</Col>
							</Row>

							<Row className='d-flex justify-content-center' styleName='btn-wrapper'>
								<Button variant='primary' onClick={sendProductData}>
									Salva
								</Button>

								<Button variant='secondary' onClick={deleteProduct}>
									Elimina
								</Button>
							</Row>
						</Form>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default CSSModules(ModifyProduct, styles, { allowMultiple: true });
