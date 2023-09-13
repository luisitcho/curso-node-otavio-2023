const express = require('express');
const route = express.Router();
const homeController = require('./controllers/homeController');
const contatoController = require('./controllers/contatoController');
// Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Contato
route.get('/contato', contatoController.testeContato);

module.exports = route;