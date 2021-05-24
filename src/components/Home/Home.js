import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Home.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Carousel, Col } from '@themesberg/react-bootstrap';

function Home() {
	const history = useHistory('/');
	const [a, setA] = useState({ idProdotto: 0, path: 'logo-noname.png' });
	const [b, setB] = useState({ idProdotto: 0, path: 'logo-noname.png' });
	const [c, setC] = useState({ idProdotto: 0, path: 'logo-noname.png' });

	useEffect(() => {
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setA(data);
			});
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setB(data);
			});
		fetch('/api/prodotti/?rand=t')
			.then((res) => res.json())
			.then((data) => {
				setC(data);
			});
	}, [setA, setB, setC]);

	return (
		<>
			<div styleName='container'>
				<Carousel controls={false}>
					<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
						<img className='d-block w-100' src={'/img/' + a.path} alt='First slide' onClick={() => history.push('/shop/' + a.idProdotto)} />
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{a.nome}</h3>
							<p>{a.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
						<Link to={'shop' + b.idProdotto}>
							<img className='d-block w-100' src={'/img/' + b.path} alt='Second slide' onClick={() => history.push('/shop/' + b.idProdotto)} />
						</Link>
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{b.nome}</h3>
							<p>{a.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
						<Link to={'shop' + c.idProdotto}>
							<img className='d-block w-100' src={'/img/' + c.path} alt='Third slide' onClick={() => history.push('/shop/' + c.idProdotto)} />
						</Link>
						<Carousel.Caption style={{ background: '#ffffff66' }}>
							<h3>{c.nome}</h3>
							<p>{a.descS}</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
			<Col className='md-12 text-center'>
				<Link to='/shop' className='btn btn-primary text-center'>
					Visita il catalogo
				</Link>
			</Col>
		</>
	);
}

export default CSSModules(Home, styles, { allowMultiple: true });
