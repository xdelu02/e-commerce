import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ModifyProduct.module.scss';

function ModifyProduct() {
	return (
		<div styleName='grid-wrap'>
			<div styleName='grid'>
				<span>One column default</span>
			</div>

			<div styleName='grid'>
				<span>Half column 1</span>
				<span>Half column 2</span>
			</div>

			<div styleName='grid'>
				<span>3-col 1</span>
				<span>3-col 2</span>
				<span>3-col 3</span>
			</div>

			<div styleName='grid'>
				<span>4-col 1</span>
				<span>4-col 2</span>
				<span>4-col 3</span>
				<span>4-col 4</span>
			</div>
		</div>
	);
}

export default CSSModules(ModifyProduct, styles, { allowMultiple: true });
