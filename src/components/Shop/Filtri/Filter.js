import React from 'react';
import './Filter.scss';
import filterIcon from '../../../assets/icons/filter.png';
import Prezzi from './Prezzi/Prezzi';
import Categorie from './Categorie/Categorie';
import {openFilterMenu, closeFilterMenu} from './utility';

function Filter() {

	return (
		<>
			<div className="topBar">
				<img src={filterIcon} onClick={openFilterMenu} alt=""/>
			</div>

			<div className="filter-menu">
				<button onClick={closeFilterMenu}>Close &times;</button>
				<Prezzi />
				<Categorie />
			</div>
		</>
	);
}

export default Filter;
