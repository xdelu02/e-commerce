import React from 'react';
import { Col, Row } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
		<div>
			<Row>
				<Col className='md-12 text-center'>
					<Link to='/shop' className='btn btn-primary text-center'>
						Torna al catalogo
					</Link>
				</Col>
			</Row>
		</div>
	);
}

export default Success;
