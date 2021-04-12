import React from 'react';
import Categorie from './Categorie/Categorie';
import "./Filtri.css";
import Prezzi from './Prezzi/Prezzi';

function Filtri() {
	return (
		<div className="filtri">
			<div className="section-filter">
				<Prezzi />
                <Categorie />
            </div>
			<button className="clearfilters">CLEAR ALL FILTERS</button>
		</div>
	);
}

export default Filtri;