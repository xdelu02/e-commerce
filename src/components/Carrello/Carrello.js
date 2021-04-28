import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import "./Carrello.scss";

function Carrello() {
	const cart = useSelector(state => state.cart);
	const [prodotto, setProdotto] = useState({idProdotto: 0});
	const prodotti = [];

	const load = (id) => {
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/' + id)
			.then((result) => result.json())
			.then(
				(result) => {
					return result;
				},
				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		cart.forEach(element => {
			prodotti.push(load(element.idProdotto));
			console.log(load(element.idProdotto));
			console.log(prodotti);
		});
		fetch('http://ecommerce.ideeinbit.it/api/prodotti/1')
			.then((result) => result.json())
			.then(
				(result) => {
					if (result.message === 'No matching Prodotti found.') {
						return ;
					} else {
						setProdotto(result);
					}
				},
				(error) => {
					console.log(error);
				}
			);
	},[]);

    return (
        <>
            <h1>CARRELLO</h1>
            {cart.map((e, index) => <p key={index}>id: {e.idProdotto}; qta: {e.quantita}</p>)}
			{prodotto.idProdotto}
			{prodotti.map((e, index) => <p key={index}>e</p>)}
        </>
    );
}

export default Carrello;