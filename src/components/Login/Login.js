import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import wave from '../../assets/icons/wave.png';
import bg from '../../assets/icons/bg.svg';
import logo from '../../assets/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
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
			console.log(error);
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
		<>
			<img className='wave' src={wave} alt='' />
			<div className='container-login'>
				<div className='img'>
					<img src={bg} alt='' />
				</div>
				<div className='login-content'>
					<form onSubmit={handleSubmit}>
						<img src={logo} alt='logo' />
						<h2 className='title'>Welcome</h2>
						<div className='input-div one'>
							<div className='i'>
								<FontAwesomeIcon icon={faUser} />
							</div>
							<div className='div'>
								<h5>Username</h5>
								<input type='text' className='input' name='email' onChange={emailHandler} />
							</div>
						</div>
						<div className='input-div pass'>
							<div className='i'>
								<FontAwesomeIcon icon={faLock} />
							</div>
							<div className='div'>
								<h5>Password</h5>
								<input type='password' className='input' name='password' onChange={passwordHandler} />
							</div>
						</div>
						<a href='#' className='forgotPasswordAnchor'>
							Forgot Password?
						</a>
						<button type='submit' className='btn-login' disabled={loading}>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
