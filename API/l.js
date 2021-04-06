$(document).ready(function() {
    var datiDaInviare = {
		"idCliente": "2",
		"email": "Luigi@verdi.com",
		"password": "Verdi@Luigi",
		"saldo": "3333333"
    };

    $.ajax({
        url: 'http://localhost/API/api/daticlienti/',
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

// http://localhost/API/api/prodotti/?idCategoria=[idCategoria]
// http://localhost/API/api/prodotti/?key=[parola chiave]
// http://localhost/API/api/amministratori/?email=[email]
// http://localhost/API/api/amministratori/?username=[username]
// http://localhost/API/api/daticliente/?email=[email]
// http://localhost/API/api/ordini/?idCliente=[idCliente]
// http://localhost/API/api/ordini/?codice=[codice]
// http://localhost/API/api/immagini/?idProdotto=[idProdotto]
// http://localhost/API/api/dettaglioordine/?idOrdine=[idOrdine]