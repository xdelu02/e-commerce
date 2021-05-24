// $(document).ready(function() {
//     var datiDaInviare = {
// 		"email": "Luigi@verdi.com",
// 		"nome": "Luigi@verdi.com",
// 		"cognome": "Luigi@verdi.com",
// 		"dataN": "2000-01-01"
//     };

//     $.ajax({
//         url: 'http://localhost/API/api/clienti/',
//         type: 'post',
//         contentType: 'application/json',
//         accept: "*/*",
//         data: JSON.stringify(datiDaInviare),
//         success: function(data, textStatus, jQxhr) {
//             console.log(data);
//         },
//         error: function(jqXhr, textStatus, errorThrown){
//             console.log(errorThrown);
//         }
//     });
// });

fetch('http://localhost/API/api/carrelli/', {
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		idCliente: 'djdjd@it.it',
		indirizzo: 'Via del filarete 17, 50143, Firenze, Italia',
		importo: 170.50
	})
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
	});
/*
fetch("http://localhost/API/api/carrelli/", {
	method: "PATCH",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		idCliente: "djdjd@it.it",
		indirizzo: "VIA VIALE",
		importo: 200,
	}),
}).then((res) => {
	console.log(res.json());
});*/

// http://localhost/API/api/prodotti/?idCategoria=[idCategoria]
// http://localhost/API/api/prodotti/?key=[parola chiave]
// http://localhost/API/api/amministratori/?email=[email]
// http://localhost/API/api/amministratori/?username=[username]
// http://localhost/API/api/daticliente/?email=[email]
// http://localhost/API/api/ordini/?idCliente=[idCliente]
// http://localhost/API/api/ordini/?codice=[codice]
// http://localhost/API/api/immagini/?idProdotto=[idProdotto]
// http://localhost/API/api/dettaglioordine/?idOrdine=[idOrdine]
