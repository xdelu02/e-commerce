export function addToCart(prod) {
	return {
		type: 'add',
		prodotto: prod
	};
}

export function removeToCart(prod) {
	return {
		type: 'remove',
		prodotto: prod
	};
}

export function updateToCart(prod) {
	return {
		type: 'update',
		prodotto: prod
	};
}

export function addifnotToCart(prod) {
	return {
		type: 'addifnot',
		prodotto: prod
	};
}