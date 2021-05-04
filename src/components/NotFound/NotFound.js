import React from 'react';
import notFoundImage from '../../assets/svg/notFoundSvg.svg';
import CSSModules from 'react-css-modules';
import styles from './NotFound.module.scss';

function NotFound() {
	const handleOnClick = () => {
		window.location.href = '/';
	};

	return (
		<>
			<div styleName='wrapper'>
				<img src={notFoundImage} alt='' />
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
