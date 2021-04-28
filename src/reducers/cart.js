const cartReducer = (state = [], action) => {
	switch (action.type) {
		case 'add':
			let bool = true;
			state.forEach((element) => {
				if (element.idProdotto === action.prodotto.idProdotto) {
					element.quantita += action.prodotto.quantita;
					bool = false;
					return state;
				}
			});
			if (bool) state.push(action.prodotto);
			return state;
		case 'remove':
			state.splice(state.find(action.prodotto));
			return state;
		default:
			return state;
	}
};

export default cartReducer;
