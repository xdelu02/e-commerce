INSERT INTO
    `prodotti` (`idProdotto`, `nome`, `descS`, `descL`, `prezzo`, `quantita`, `idCategoria`)
VALUES
    (NULL, 'Iphone X', 'Super Retina HD, Multi‑Touch OLED, Display, 3D Touch', 'Apple iPhone X è uno smartphone iOS con caratteristiche all\'avanguardia che lo rendono una scelta eccellente per ogni tipo di utilizzo. Dispone di un grande display da 5.8 pollici e di una risoluzione da 2436x1125 pixel, fra le più elevate attualmente in circolazione. Le funzionalità offerte da questo Apple iPhone X sono innumerevoli e al top di gamma. A cominciare dal modulo LTE 4G che permette un trasferimento dati e una navigazione in internet eccellente, passando per la connettività Wi-fi e il GPS.\r\nFotocamera da 12 megapixel. Lo spessore di 7.7mm è veramente contenuto e rende questo Apple iPhone X ancora più spettacolare.', '399.99', '15', 'Smartphone'),
    (NULL, 'lenovo laptop thinkpad t15g', 'Processore Intel Core i7-10875H, Windows 10 Pro 64, Unità SSD da 512 GB', 'Creato per utenti esperti\r\nIl notebook ThinkPad T15g sfrutta la potenza dei processori Intel® Core™ o Xeon® fino alla decima generazione con un massimo di 8 core per soddisfare le esigenze degli utenti con i flussi di lavoro più complessi. Le schede grafiche NVIDIA® GeForce RTX™ opzionali offrono potenza grafica mobile senza confronti. \r\n\r\nNon solo potenza\r\nIl flusso d\'aria e la saturazione termica ottimizzati di ThinkPad T15g garantiscono velocità ed efficienza al dispositivo.', '2519', '3', 'Laptop'),
    (NULL, 'Samsung Galaxy Fold', 'Smartphone con schermo pieghevole', 'Design innovativo e rivoluzionario. Display Infinity Flex per un’esperienza senza precedenti. App Continuity e Multitasking Avanzato per avere più libertà e divertimento. Performance superiori per la massima versatilità. 12GB RAM. 512GB SSD (di cui il 10% dedicato al sistema). Colorazione: cosmos Black', '1256.50', '100', 'Smartphone'),
    (NULL, 'Apple Watch Series 6', 'Apple Watch Series 6 (GPS, 44 mm) Cassa in alluminio grigio siderale con Cinturino Sport nero', 'Con il modello GPS rispondi a chiamate e messaggi dall’orologio. Puoi misurare l’ossigeno nel sangue con un nuovo sensore e una nuova app. Puoi controllare il ritmo cardiaco con l’app ECG. Il display Retina always-on è 2,5 volte più luminoso alla luce del giorno, anche quando tieni abbassato il polso. Il chip S6 SiP è fino al 20% più veloce rispetto al chip dei modelli Series 5. Con Apple Watch misuri ogni giorno quanto ti muovi, e i progressi compiuti li controlli nell’app Fitness su iPhone. Puoi registrare ogni tuo allenamento: corsa, camminata, bicicletta, yoga, nuoto e ballo. Swimproof. Sincronizzi musica, podcast e audiolibri. Apple Watch richiede iPhone 6s o successivo con iOS 14 o successivo', '439.00', '50', 'Smartwatch');





INSERT INTO
    `categorie` (`idCategoria`)
VALUES
    ('Smartphone'),
    ('Laptop'),
    ('Smartwatch');