import React from 'react';
import notFound from '../../assets/svg/notFound.svg';
import notFoundMobile from '../../assets/svg/notFound-mobile.svg';
import CSSModules from 'react-css-modules';
import styles from './NotFound.module.scss';

function NotFound() {
	const handleOnClick = () => {
		window.location.href = '/';
	};

	return (
		<div styleName='wrapper'>
			<div styleName='img'></div>
			<h3>Ti sei perso ...</h3>
			<div styleName='wrapper-btn'>
				<a className='btn' onClick={handleOnClick}>
					Torna a casa
				</a>
			</div>
		</div>
	);
}

export default CSSModules(NotFound, styles, { allowMultiple: true });
