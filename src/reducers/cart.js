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
			state.forEach(function (element, index, object) {
				if (element.idProdotto === action.prodotto.idProdotto) {
					object.splice(index, 1);
				}
			});
			return state;

		case 'update':
			state.forEach((element) => {
				if (element.idProdotto === action.prodotto.idProdotto) {
					element.quantita = action.prodotto.quantita;
					return state;
				}
			});
			return state;

		default:
			return state;
	}
};

export default cartReducer;
