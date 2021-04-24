const cartReducer = (state = [], action) => {
	switch (action.type) {
		case 'add':
			state.push(action.prodotto);
			return state;
		case 'remove':
			state.splice(state.find(action.prodotto));
			return state;
		default:
			return state;
	}
};

export default cartReducer;
