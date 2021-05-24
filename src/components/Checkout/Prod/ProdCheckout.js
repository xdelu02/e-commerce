import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Prod.module.scss';
import { Col, Row } from '@themesberg/react-bootstrap';

const ProdCheckout = (props) => {
	const cart = props.cart;
	const [qta, setQta] = useState(1);

	useEffect(() => {
		cart.forEach((e) => {
			if (e.idProdotto === props.id) {
				setQta(e.quantita);
				return;
			}
		});
	}, [props.id, cart]);

	return (
		<div id={props.id} className={'d-flex align-items-center justify-content-between border-bottom border-light pb-3'}>
			<Row>
				<Col sm>
					<img src={'/img/' + props.path} alt={props.nome} styleName='prodImage' />
				</Col>
				<Col sm>
					<p style={{ paddingTop: '1rem' }}>{props.nome}</p>
				</Col>
				<Col sm>
					<p style={{ paddingTop: '1rem' }}>{props.prezzo + '€'}</p>
				</Col>
				<Col sm>
					<div className='d-flex justify-content-center' style={{ paddingTop: '1rem' }}>
						<button id={props.id} className='btn btn-primary btn-sm' style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} disabled>
							-
						</button>
						<input id={props.id} type='number' value={qta} min='1' max={qta} disabled />
						<button id={props.id} className='btn btn-primary btn-sm' style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} disabled>
							+
						</button>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default CSSModules(ProdCheckout, styles, { allowMultiple: true });

/*
  pb - 3
  py - 3
  pt-3
*/
