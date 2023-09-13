const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Contato
route.get('/contato', contatoController.testeContato);

module.exports = route;