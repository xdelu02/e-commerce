import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotFound.module.scss';

function NotFound() {

	return (
		<div styleName='wrapper'>
			<div styleName='img'></div>
			<h3>Ti sei perso ...</h3>
			<div styleName='wrapper-btn'>
				<a href="/" className='btn'>
					Torna a casa
				</a>
			</div>
		</div>
	);
}

export default CSSModules(NotFound, styles, { allowMultiple: true });
