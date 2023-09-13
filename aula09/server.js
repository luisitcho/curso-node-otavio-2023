require('dotenv').config();

const express = require('express');
const app = express();

// Comecção com a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONCONFIG, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to server');
        app.emit('connect');
    }).catch(err => console.log(err));

const routes = require('./routes');
const path = require('path');
const myMiddleware = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public'))); //Conteúdo estatico
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(myMiddleware);
app.use(routes);

// Executa tudpo apos a conexão com o banco de dados
app.on('connect', () => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
})