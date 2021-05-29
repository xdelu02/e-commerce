import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Col, Row, Card, Form, Button, Image } from '@themesberg/react-bootstrap';
import { useDropzone } from 'react-dropzone';
import CSSModules from 'react-css-modules';
import styles from './ModifyProduct.module.scss';

function AddProduct() {
	const [nome, setNome] = useState('');
	const [descS, setDescS] = useState('');
	const [descL, setDescL] = useState('');
	const [categoria, setCategoria] = useState('');
	const [categorie, setCategorie] = useState([]);
	const [prezzo, setPrezzo] = useState('');
	const [qta, setQta] = useState(0);
	const [dropZoneClass, setDropZoneClass] = useState('');
	const [files, setFiles] = useState([]);
	const [filesNoPrew, setFilesNoPrew] = useState([]);
	const history = useHistory('/admin/prodotti');

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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nome: nome,
				descS: descS,
				descL: descL,
				prezzo: parseFloat(prezzo),
				quantita: parseInt(qta),
				idCategoria: categoria,
				path: files[0].path
			})
		})
			.then((response) => response.json())
			.then(() => {
				const formData = new FormData();
				formData.append('inpFile', filesNoPrew[0]);
				fetch('/api/img/', {
					method: 'POST',
					body: formData
				})
					.then(() => (window.location.href = '/admin/prodotti/'))
					.catch((err) => {
						console.log(err);
						history.push('/404');
					});
			})
			.catch((err) => {
				console.log(err);
				history.push('/404');
			});
	};

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
				setFilesNoPrew(files.map((file) => file));
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
						<Button onClick={reRender} className='btn-immagine mt-3'>
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

	useEffect(() => {
		fetch('/api/categorie/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'Categorie non trovate') {
						setCategorie(result.records);
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

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
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Nome prodotto</Form.Label>
										<Form.Control required type='text' onChange={handleNome} />
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Descrizione corta</Form.Label>
										<Form.Control maxLength='50' required as='textarea' rows={2} onChange={handleDescS} />
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Descrizione lunga</Form.Label>
										<Form.Control required as='textarea' rows={3} onChange={handleDescL} />
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={10} className='mb-3'>
									<Form.Group>
										<Form.Label>Categoria</Form.Label>
										<Form.Select onChange={handleCategoria}>
											{categorie.map((e, i) => (
												<option value={e} key={i}>
													{e.idCategoria}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
							</Row>
							<div className='container'></div>
							<div className='row'>
								<div className='col input-sm'>
									<Form.Group>
										<Form.Label>Prezzo</Form.Label>
										<Form.Control required type='text' onChange={handlePrezzo} />
									</Form.Group>
								</div>
								<div className='col input-sm '>
									<Form.Group>
										<Form.Label>Quantità</Form.Label>
										<Form.Control required type='number' onChange={handleQta} />
									</Form.Group>
								</div>
							</div>

							<Row className='d-flex justify-content-start mt-3' styleName='btn-wrapper'>
								<Button variant='primary' onClick={sendProductData}>
									Aggiungi prodotto
								</Button>
							</Row>
						</Form>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}
export default CSSModules(AddProduct, styles, { allowMultiple: true });
