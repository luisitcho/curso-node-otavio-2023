require('dotenv').config();

const express = require('express');
const app = express();

// Conexão com a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONCONFIG, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to server');
        app.emit('connect');
    }).catch(err => console.log(err));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csurf = require('csurf');

const routes = require('./routes');
const path = require('path');
const { myMiddleware, checkCsurfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public'))); //Conteúdo estatico

const sessionOptions = session({
    secret: 'sessão do usuario',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONCONFIG }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csurf());
app.use(myMiddleware);
app.use(checkCsurfError);
app.use(csrfMiddleware);
app.use(routes);

// Executa tudpo apos a conexão com o banco de dados
app.on('connect', () => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
})