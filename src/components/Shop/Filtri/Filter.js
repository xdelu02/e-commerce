import React from 'react';
import Prezzi from './Prezzi/Prezzi';
import Categorie from './Categorie/Categorie';

function Filter({ handleCategorie }) {
	return (
		<div className='filter-filter'>
			<Prezzi />
			<Categorie handleCategorie={handleCategorie} />
		</div>
	);
}

export default Filter;
