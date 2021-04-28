import React from 'react';
import {useSelector} from 'react-redux';

export default function ProdCart(prop) {
	const cart = useSelector((state) => state.cart);
	const getQta = () => {
		const c = cart;
		c.filter((val) => {
			if (val.idProdotto === prop.id) {
				return val.quantita;
			}
			else return null;
		})
		return "//";
	}

	return (
		<div id={prop.id}>
			<img src={'http://ecommerce.ideeinbit.it/img/' + prop.nome + '.png'} alt="prodotto" id="logo" />
			<p className="title">{prop.nome}</p>
			<p className="descS">{prop.descS}</p>
			<p className="prezzo">{prop.prezzo + '€'}</p>
			<p>Quantita: {"//DA FARE (forse viene meglio in un select)"}</p>
			<button>RIMUOVI</button>
		</div>
	);
}
