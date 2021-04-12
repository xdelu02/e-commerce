import React from 'react';
import Filtri from './Filtri/Filtri';
import BarraRicerca from './BarraRicerca/BarraRicerca';
import Prodotti from './Prodotti/Prodotti';

function Shop() {
	return (
		<div>
			<Filtri />
			<BarraRicerca />
			<Prodotti />
		</div>
	);
}

export default Shop;