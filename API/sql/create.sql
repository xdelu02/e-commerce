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
CREATE TABLE Immagini(
	idImmagine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idProdotto int NOT NULL,
	path TEXT NOT NULL
);
CREATE TABLE Clienti(
	idCliente int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(25) NOT NULL,
	cognome VARCHAR(25) NOT NULL,
	dataN date NOT NULL
);
CREATE TABLE DatiClienti(
	idCliente int PRIMARY KEY NOT NULL,
	email VARCHAR(255) NOT NULL,
	password LONGTEXT NOT NULL,
	saldo float NOT NULL
);
CREATE TABLE Amministratori(
	idAdmin int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(25) NOT NULL,
	cognome VARCHAR(25) NOT NULL,
	username VARCHAR(30) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password LONGTEXT NOT NULL
);
CREATE TABLE Ordini(
	idOrdine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idCliente int NOT NULL,
	indirizzo LONGTEXT NOT NULL,
	codice LONGTEXT NOT NULL
);
CREATE TABLE DettaglioOrdine(
	idDettaglioOrdine int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	idOrdine int NOT NULL,
	idProdotto int NOT NULL,
	prezzoU float NOT NULL,
	quantita int NOT NULL
);
