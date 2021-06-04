import { Col, Toast, Row } from '@themesberg/react-bootstrap';
import React from 'react';

const NotifyAddToCart = ({ toast, toggleToast, prodotto }) => {
	return (
		<div>
			<Col className='md-4'>
				<Toast show={toast} onClose={toggleToast} className='position-asolute fixed-top fixed-right' style={{ marginLeft: '1rem', marginTop: '1rem' }} delay={3000} autohide>
					<Toast.Header closeLabel='' closeButton={false}>
						<Col xl={11} xs={11}>
							<strong className='mr-auto text-primary'>{prodotto.nome} aggiunto al carrello!</strong>
						</Col>
						<Col className='text-end'>
							<strong className='text-primary' onClick={toggleToast}>
								X
							</strong>
						</Col>
					</Toast.Header>
					<Toast.Body style={{ background: '#ffffff', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
						<Row>
							<Col xl={4} xs={4}>
								<img src={prodotto.path} alt='' />
							</Col>
							<Col>
								<Row>
									<h5>{prodotto.nome}</h5>
								</Row>
								<Row>
									<p>{prodotto.descS}</p>
								</Row>
								<Row>
									<p>{prodotto.prezzo} €</p>
								</Row>
							</Col>
						</Row>
					</Toast.Body>
				</Toast>
			</Col>
		</div>
	);
};

export default NotifyAddToCart;
