import React from 'react';
import './Categoria.scss';

function Categoria(props) {
	return (
		<div className='categoria'>
			<input className='checkbox' type='checkbox' name='category' id={props.categoria} />
			<label>{props.categoria}</label>
			<br />
		</div>
	);
}

export default Categoria;
