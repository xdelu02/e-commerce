import React from 'react';
import Filtri from './Filtri/Filtri';
import BarraRicerca from './BarraRicerca/BarraRicerca';
import Prodotti from './Prodotti/Prodotti';

function App() {
	return (
		<div>
			<Filtri />
			<BarraRicerca />
			<Prodotti />
		</div>
	);
}

export default App;