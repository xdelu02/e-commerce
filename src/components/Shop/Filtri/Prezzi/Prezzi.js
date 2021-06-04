import React from 'react';
import { Form } from '@themesberg/react-bootstrap';

function Prezzi() {
	return (
		<Form className="ms-1">
			<fieldset>
				<h5>Range di prezzi</h5>
				<Form.Check type='radio' label='10' defaultValue='10' name='price' id='price1' htmlFor='price1' />
				<Form.Check type='radio' label='10-100' defaultValue='10-100' name='price' id='price2' htmlFor='price2' />
				<Form.Check type='radio' label='100-500' defaultValue='100-500' name='price' id='price3' htmlFor='price3' />
				<Form.Check type='radio' label='500' defaultValue='500' name='price' id='price4' htmlFor='price4' />
				<Form.Check defaultChecked type='radio' label='Tutti' defaultValue='Tutti' name='price' id='price5' htmlFor='price5' />
			</fieldset>
		</Form>
	);
}

export default Prezzi;
