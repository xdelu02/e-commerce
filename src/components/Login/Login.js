import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Col, Row, Form, Card, Button, Container, InputGroup, Alert } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Login.module.scss';

function Login() {
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await login(email, password);
			history.push('/');
		} catch {
			setError('Failed to sign in');
		}

		setLoading(false);
	}

	async function emailHandler(e) {
		let email = e.target.value;
		setEmail(email);
	}

	async function passwordHandler(e) {
		let password = e.target.value;
		setPassword(password);
	}

	return (
		<main styleName="main">
			<section className='d-flex align-items-center my-5 mt-lg-2 mb-lg-2'>
				<Container>
					<p className='text-center'>
						<Card.Link as={Link} to={'/'} className='text-gray-700'>
							<FontAwesomeIcon icon={faAngleLeft} className='me-2' /> Torna alla home
						</Card.Link>
					</p>
					<Row className='justify-content-center form-bg-image'>
						<Col xs={12} className='d-flex align-items-center justify-content-center'>
							<div className='bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
								<div className='text-center text-md-center mb-4 mt-md-0'>
									<h3 className='mb-0'>Accedi al negozio</h3>
								</div>
								<Form className='mt-4' onSubmit={handleSubmit}>
									<Form.Group id='email' className='mb-4'>
										<Form.Label>Email</Form.Label>
										<InputGroup onChange={emailHandler}>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control autoFocus required type='email' placeholder='esempio@dominio.com' />
										</InputGroup>
									</Form.Group>
									<Form.Group>
										<Form.Group id='password' className='mb-4'>
											<Form.Label>Password</Form.Label>
											<InputGroup onChange={passwordHandler}>
												<InputGroup.Text>
													<FontAwesomeIcon icon={faUnlockAlt} />
												</InputGroup.Text>
												<Form.Control required type='password' placeholder='Password' />
											</InputGroup>
										</Form.Group>
										<div className='d-flex justify-content-between align-items-center mb-4'>
											<Card.Link className='small text-end'>Dimenticato la password ?</Card.Link>
										</div>
										<div styleName="alert">{error && <Alert variant='danger'>{error}</Alert>}</div>
									</Form.Group>
									<Button variant='primary' type='submit' className='w-100' disabled={loading}>
										Accedi
									</Button>
								</Form>

								<div className='mt-3 text-center'>
									<span className='fw-normal'>o accedi con</span>
								</div>
								<div className='d-flex justify-content-center mt-1'>
									<Button variant='outline-light' className='btn-icon-only btn-pill text-facebook me-2'>
										<FontAwesomeIcon icon={faGoogle} />
									</Button>
								</div>
								<div className='d-flex justify-content-center align-items-center mt-2'>
									<span className='fw-normal'>
										Non sei ancora registrato?
										<Card.Link as={Link} to={'/signup'} className='fw-bold'>
											{` Crea un'account `}
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
};

export default CSSModules(Login, styles, { allowMultiple: true });