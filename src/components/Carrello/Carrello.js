import React from 'react';
import {useSelector} from 'react-redux';
import "./Carrello.scss";

function Carrello() {
    const cart = useSelector(state => state.cart)
    return (
        <center>
            <h1>CARRELLO</h1>
            {cart.map((e, index) => <p key={index}>id: {e.idProdotto}; qta: {e.quantita}</p>)}
        </center>
    );
}

export default Carrello;