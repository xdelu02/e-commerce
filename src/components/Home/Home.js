import { Carousel } from '@themesberg/react-bootstrap';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Home.module.scss';
import b from '../../assets/img/pages/404.jpg';
import a from '../../assets/img/pages/500.jpg';
import c from '../../assets/img/pages/sign-in.jpg';

function Home() {
	return (
		<div styleName='container'>
			<Carousel controls={false}>
				<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
					<img className='d-block' src={a} alt='First slide' />
				</Carousel.Item>
				<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
					<img className='d-block' src={b} alt='Second slide' />
				</Carousel.Item>
				<Carousel.Item autoPlay={true} interval={2000} controls={false} indicators={false}>
					<img className='d-block' src={c} alt='Third slide' />
				</Carousel.Item>
			</Carousel>
		</div>
	);
}

export default CSSModules(Home, styles, { allowMultiple: true });
