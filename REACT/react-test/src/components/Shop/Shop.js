import React from 'react';
import Filtri from './Filtri/Filtri';
import BarraRicerca from './BarraRicerca/BarraRicerca';
import Prodotti from './Prodotti/Prodotti';
import "./Shop.scss";

function Shop() {
	return (
		<div className="all">
			<Filtri />
			<div className="prod">
				<BarraRicerca />
				<Prodotti />
			</div>
		</div>
	);
}

export default Shop;