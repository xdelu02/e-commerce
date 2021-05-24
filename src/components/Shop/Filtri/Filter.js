import React from 'react';
import Prezzi from './Prezzi/Prezzi';
import Categorie from './Categorie/Categorie';

function Filter() {
	return (
		<div className="filter-filter">
			<Prezzi />
			<Categorie />
		</div>
	);
}

export default Filter;
