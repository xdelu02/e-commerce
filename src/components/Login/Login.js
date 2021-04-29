import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import wave from '../../assets/icons/wave.png';
import bg from '../../assets/icons/bg.svg';
import logo from '../../assets/logo/logo.png';

export default function Login() {
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(user) {
		try {
			setError('');
			setLoading(true);
			await login(user.email, user.password);
			history.push('/');
		} catch {
			setError('Failed to sign in');
			console.log(error);
		}

		setLoading(false);
	}

	return (
		<>
			<img className='wave' src={wave} alt=""/>
			<div className='container-login'>
				<div className='img' >
					<img src={bg} alt=""/>
				</div>
				<div className='login-content'>
					<form action='index.html'>
						<img src={logo} alt="logo"/>
						<h2 className='title'>Welcome</h2>
						<div className='input-div one'>
							<div className='i'>
								<i className='fas fa-user'></i>
							</div>
							<div className='div'>
								<h5>Username</h5>
								<input type='text' className='input' />
							</div>
						</div>
						<div className='input-div pass'>
							<div className='i'>
								<i className='fas fa-lock'></i>
							</div>
							<div className='div'>
								<h5>Password</h5>
								<input type='password' className='input' />
							</div>
						</div>
						<a href='#' className='forgotPasswordAnchor'>
							Forgot Password?
						</a>
						<input type='submit' className='btn-login' value='Login' />
					</form>
				</div>
			</div>
		</>
	);
}
