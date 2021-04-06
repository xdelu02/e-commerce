$(document).ready(function() {
    var datiDaInviare = {
		"idCliente": "2",
		"email": "Luigi@verdi.com",
		"password": "Verdi@Luigi",
		"saldo": "3333333"
    };

    $.ajax({
        url: 'http://localhost/TEST%20API/api/daticlienti/',
        type: 'patch',
        contentType: 'application/json',
        accept: "*/*",
        data: JSON.stringify(datiDaInviare),
        success: function(data, textStatus, jQxhr) {
            console.log(data);
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
});

// http://localhost/TEST%20API/api/prodotti/?idCategoria=[idCategoria]
// http://localhost/TEST%20API/api/prodotti/?key=[parola chiave]
// http://localhost/TEST%20API/api/amministratori/?email=[email]
// http://localhost/TEST%20API/api/amministratori/?username=[username]
// http://localhost/TEST%20API/api/daticliente/?email=[email]
// http://localhost/TEST%20API/api/ordini/?idCliente=[idCliente]
// http://localhost/TEST%20API/api/ordini/?codice=[codice]
// http://localhost/TEST%20API/api/immagini/?idProdotto=[idProdotto]
// http://localhost/TEST%20API/api/dettaglioordine/?idOrdine=[idOrdine]