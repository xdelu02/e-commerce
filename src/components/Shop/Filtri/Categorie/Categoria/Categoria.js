import React from 'react';
import { Form } from '@themesberg/react-bootstrap';

function Categoria(props) {
	return (
		<>
			<Form.Check label={props.categoria} id={'checkbox' + props.identificativo} htmlFor={'checkbox' + props.identificativo} />
		</>
	);
}

export default Categoria;
