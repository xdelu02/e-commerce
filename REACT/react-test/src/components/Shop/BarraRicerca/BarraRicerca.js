import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./BarraRicerca.scss";

function BarraRicerca() {
	return (
		<div className="barraricerca">
            <input type="text" name="search" placeholder="Search here" />
		    <button><FontAwesomeIcon className="fa fa-2x magnifier" icon={faSearch} aria-hidden="true"></FontAwesomeIcon></button>
		</div>
	);
}

export default BarraRicerca;