import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Prod.module.scss';
import { Col } from '@themesberg/react-bootstrap';

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
			<Col>
				<img src={'/img/' + props.path} alt={props.nome} styleName='prodImage' />
			</Col>
			<Col>
				<p>{props.nome}</p>
			</Col>
			<Col>
				<p>{props.prezzo + '€'}</p>
			</Col>
			<Col>
				<div className='d-flex justify-content-center'>
					<button id={props.id} className='btn btn-primary btn-sm' style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} disabled>
						-
					</button>
					<input id={props.id} type='number' value={qta} min='1' max={qta} disabled />
					<button id={props.id} className='btn btn-primary btn-sm' style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} disabled>
						+
					</button>
				</div>
			</Col>
		</div>
	);
}

export default CSSModules(ProdCheckout, styles, { allowMultiple: true });

/*
  pb - 3
  py - 3
  pt-3
*/
