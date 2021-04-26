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

fetch("http://localhost/API/api/clienti/", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: "djdjd@it.it",
        nome: "Piero",
        cognome: "Gianni",
        dataN: "2000-01-01"
    }),
}).then((res) => {
    console.log(res.json());
});

// http://localhost/API/api/prodotti/?idCategoria=[idCategoria]
// http://localhost/API/api/prodotti/?key=[parola chiave]
// http://localhost/API/api/amministratori/?email=[email]
// http://localhost/API/api/amministratori/?username=[username]
// http://localhost/API/api/daticliente/?email=[email]
// http://localhost/API/api/ordini/?idCliente=[idCliente]
// http://localhost/API/api/ordini/?codice=[codice]
// http://localhost/API/api/immagini/?idProdotto=[idProdotto]
// http://localhost/API/api/dettaglioordine/?idOrdine=[idOrdine]