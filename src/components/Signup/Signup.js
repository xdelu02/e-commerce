import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEnvelope, faUnlockAlt, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import BgImage from '../../assets/img/illustrations/signin.svg';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Signup.module.scss';

function Signup() {
	const [birthday, setBirthday] = useState('2008-7-04');
	const { signup } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	async function handleSubmit() {
		if (password !== confirmPassword) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(email, password);
			fetch('http://localhost/api/clienti/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					nome: name,
					cognome: lastName,
					dataN: birthday
				})
			}).then((res) => {
				history.push('/');
			});
		} catch {
			setError('Failed to create an account');
			console.log(error);
		}

		setLoading(false);
	}

	async function nameHandler(e) {
		setName(e.target.value);
	}

	async function lastNameHandler(e) {
		setLastName(e.target.value);
	}

	async function emailHandler(e) {
		setEmail(e.target.value);
	}

	async function passwordHandler(e) {
		setPassword(e.target.value);
	}

	async function confirmPasswordHandler(e) {
		setConfirmPassword(e.target.value);
	}

	return (
		<main styleName='main'>
			<section className='d-flex align-items-center my-5 mt-lg-2 mb-lg-5'>
				<Container>
					<p className='text-center'>
						<Card.Link as={Link} to={'/'} className='text-gray-700'>
							<FontAwesomeIcon icon={faAngleLeft} className='me-2' /> Torna alla home
						</Card.Link>
					</p>
					<Row className='justify-content-center form-bg-image'>
						<Col xs={12} className='d-flex align-items-center justify-content-center'>
							<div className='mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
								<div className='text-center text-md-center mb-4 mt-md-0'>
									<h3 className='mb-0'>Crea un account</h3>
								</div>
								<Form className='mt-4' onSubmit={handleSubmit}>
									<Form.Group id='nome' className='mb-4'>
										<Form.Label>Inserisci nome</Form.Label>
										<InputGroup onChange={nameHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUser} />
											</InputGroup.Text>
											<Form.Control autoFocus required type='text' placeholder='Mario' />
										</InputGroup>
									</Form.Group>

									<Form.Group id='nome' className='mb-4'>
										<Form.Label>Inserisci cognome</Form.Label>
										<InputGroup onChange={lastNameHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUser} />
											</InputGroup.Text>
											<Form.Control autoFocus required type='text' placeholder='Rossi' />
										</InputGroup>
									</Form.Group>

									<Form.Group id='email' className='mb-4'>
										<Form.Label>Inserisci mail</Form.Label>
										<InputGroup onChange={emailHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control autoFocus required type='email' placeholder='esempio@dominio.com' />
										</InputGroup>
									</Form.Group>
									<Form.Group id='password' className='mb-4'>
										<Form.Label>Inserisci Password</Form.Label>
										<InputGroup onChange={passwordHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUnlockAlt} />
											</InputGroup.Text>
											<Form.Control required type='password' placeholder='Password' />
										</InputGroup>
									</Form.Group>
									<Form.Group id='confirmPassword' className='mb-4'>
										<Form.Label>Conferma Password</Form.Label>
										<InputGroup onChange={confirmPasswordHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUnlockAlt} />
											</InputGroup.Text>
											<Form.Control required type='password' placeholder='Conferma Password' />
										</InputGroup>
									</Form.Group>
									<FormCheck type='checkbox' className='d-flex mb-4'>
										<FormCheck.Input required id='terms' className='me-2' />
										<FormCheck.Label htmlFor='terms'>
											Accetto i <Card.Link>termini e le condizioni</Card.Link>
										</FormCheck.Label>
									</FormCheck>

									<Button variant='primary' type='submit' className='w-100' disabled={loading}>
										Registrati
									</Button>
								</Form>

								<div className='d-flex justify-content-center mt-1'>
									<span className='fw-normal'>or</span>
								</div>
								<div className='d-flex justify-content-center mt-2'>
									<Button variant='outline-light' className='btn-icon-only btn-pill text-facebook me-2'>
										<FontAwesomeIcon icon={faGoogle} />
									</Button>
								</div>
								<div className='d-flex justify-content-center align-items-center mt-2'>
									<span className='fw-normal'>
										Hai già un'account?
										<Card.Link as={Link} to={'/login'} className='fw-bold'>
											{` Accedi `}
										</Card.Link>
									</span>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
}

export default CSSModules(Signup, styles, { allowMultiple: true });
