DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE Categorie(
	idCategoria VARCHAR(45) PRIMARY KEY NOT NULL
);

CREATE TABLE Prodotti(
	idProdotto int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(40) NOT NULL,
	descS TEXT NOT NULL,
	descL LONGTEXT NOT NULL,
	prezzo float NOT NULL,
	quantita int NOT NULL,
	idCategoria VARCHAR(45) NOT NULL
);
ALTER TABLE Prodotti
	ADD CONSTRAINT FK_Categoria
	FOREIGN KEY (idCategoria) REFERENCES Categorie(idCategoria);

CREATE TABLE Immagini(
	idImmagine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idProdotto int NOT NULL,
	path TEXT NOT NULL
);
ALTER TABLE Immagini
	ADD CONSTRAINT FK_Prodotto
	FOREIGN KEY (idProdotto) REFERENCES Prodotti(idProdotto);

CREATE TABLE Clienti(
	email VARCHAR(255) PRIMARY KEY NOT NULL,
	nome VARCHAR(25) NOT NULL,
	cognome VARCHAR(25) NOT NULL,
	password LONGTEXT NOT NULL,
	dataN date NOT NULL
);

CREATE TABLE Amministratori(
	idAdmin int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(25) NOT NULL,
	cognome VARCHAR(25) NOT NULL,
	username VARCHAR(30) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password LONGTEXT NOT NULL,
	UNIQUE (username),
	UNIQUE (email)
);

CREATE TABLE Pagamenti (
	idPagamento INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	importo FLOAT NOT NULL
);

CREATE TABLE Ordini(
	idOrdine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idCliente VARCHAR(255) NOT NULL,
	indirizzo LONGTEXT NOT NULL,
	codice LONGTEXT NOT NULL,
	idPagamento INT NOT NULL
);
ALTER TABLE Ordini
	ADD CONSTRAINT FK_Cliente
	FOREIGN KEY (idCliente) REFERENCES Clienti(email);
ALTER TABLE Ordini
	ADD CONSTRAINT FK_Pagamento
	FOREIGN KEY (idPagamento) REFERENCES Pagamenti(idPagamento);

CREATE TABLE DettaglioOrdine(
	idDettaglioOrdine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idOrdine int NOT NULL,
	idProdotto int NOT NULL,
	prezzoU float NOT NULL,
	quantita int NOT NULL
);
ALTER TABLE DettaglioOrdine
	ADD CONSTRAINT FK_Ordine
	FOREIGN KEY (idOrdine) REFERENCES Ordini(idOrdine);
ALTER TABLE DettaglioOrdine
	ADD CONSTRAINT FK_ProdottoDettaglioOrdine
	FOREIGN KEY (idProdotto) REFERENCES Prodotti(idProdotto);

INSERT INTO
	Amministratori (nome, cognome, email, username, password)
VALUES
	('Admin', 'Admin', 'admin@admin.admin', 'admin', 'admin');