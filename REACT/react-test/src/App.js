import React from 'react';
import Filtri from './Filtri/Filtri';
import BarraRicerca from './BarraRicerca/BarraRicerca';
import Prodotti from './Prodotti/Prodotti';
//import DettaglioProdotto from './DettaglioProdotto/DettaglioProdotto';

function App() {
	return (
		<div>
			<Filtri />
			<BarraRicerca />
			<Prodotti />
		</div>
	);
	/*
		<Filtri />
		<BarraRicerca />
		<Prodotti />
	*/
	/*
		<DettaglioProdotto id="1" />
	*/
}

export default App;