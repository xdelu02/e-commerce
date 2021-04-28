import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

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
		<div>
			<h1>Login</h1>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={async (values) => {
					handleSubmit(values);
				}}
			>
				<Form>
					{}
					<label htmlFor='email'>Email</label>
					<Field id='email' name='email' placeholder='jane@acme.com' type='email' />
					<label htmlFor='password'>password</label>
					<Field id='password' name='password' type='password' />
					<button disabled={loading} type='submit'>
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}
