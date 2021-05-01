import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Login.module.scss';
import wave from '../../assets/icons/wave.png';
import bg from '../../assets/icons/bg.svg';
import logo from '../../assets/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

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
		<div styleName='wrapper'>
			<img styleName='wave' src={wave} alt='' />
			<div styleName='container'>
				<div styleName='img'>
					<img src={bg} alt='' />
				</div>
				<div styleName='login-content'>
					<form styleName="form" onSubmit={handleSubmit}>
						<img src={logo} alt='logo' />
						<h2>Welcome</h2>
						<div styleName='input-div one'>
							<div styleName='i'>
								<FontAwesomeIcon icon={faUser} />
							</div>
							<div>
								<h5>Username</h5>
								<input type='text' name='email' onChange={emailHandler} />
							</div>
						</div>
						<div styleName='input-div pass'>
							<div styleName='i'>
								<FontAwesomeIcon icon={faLock} />
							</div>
							<div>
								<h5>Password</h5>
								<input type='password' name='password' onChange={passwordHandler} />
							</div>
						</div>
						<a href='#' styleName="forgot-password-anchor">Forgot Password?</a>
						<button type='submit' styleName='btn' disabled={loading}>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CSSModules(Login, styles, { allowMultiple: true });
