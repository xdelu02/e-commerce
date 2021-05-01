import React from 'react';
import filterIcon from '../../../assets/icons/filter.png';
import Prezzi from './Prezzi/Prezzi';
import Categorie from './Categorie/Categorie';


function Filter() {
	return (
		<>
			<div className='topBar'>
				<img src={filterIcon}  alt='' />
			</div>

			<div className='filter-menu'>
				<button>Close &times;</button>
				<Prezzi />
				<Categorie />
			</div>
		</>
	);
}

export default Filter;
