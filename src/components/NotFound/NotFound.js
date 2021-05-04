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
		<>
			<div styleName='wrapper'>
				<img src={(window.screen.width > 800)? notFound : notFoundMobile} alt='' />
			</div>
			<div styleName='wrapper-btn'>
				<button className='btn' onClick={handleOnClick}>
					GO TO HOMEPAGE
				</button>
			</div>
		</>
	);
}

export default CSSModules(NotFound, styles, { allowMultiple: true });
