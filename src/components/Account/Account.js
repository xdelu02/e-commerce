import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Account() {
	const [error, setError] = useState('');
	const { logout, getCurrentUserEmail } = useAuth();

	async function handleLogout() {
		setError('');

		try {
			await logout();
		} catch {
			setError('logout fallito');
		}
	}

	return (
		<div>
			<h1>ACCOUNT</h1>
			{!(getCurrentUserEmail() !== null && getCurrentUserEmail() !== '') ? (
				<>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam corrupti deserunt quod architecto, quasi perferendis mollitia maiores odio eveniet molestiae! Reprehenderit
						erendis dolor in minus autem quas aperiam velit!
					</p>
					<div className='d-flex flex-row justify-content-evenly p-2 bd-highlight'>
						<Link to={'/login'} className='btn btn-primary'>
							Login
						</Link>
						<Link to={'/signup'} className='btn btn-secondary'>
							Signup
						</Link>
					</div>
				</>
			) : (
				<>
					<p>Gentile cliente puoi visualizzare i tuoi ordini oppure sloggarti.</p>
					<div className='d-flex flex-row justify-content-evenly p-2 bd-highlight'>
						<Link to={'/'} className='btn btn-primary' onClick={handleLogout}>
							Logout
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
