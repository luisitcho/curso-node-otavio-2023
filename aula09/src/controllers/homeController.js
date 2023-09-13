const HomeModel = require('../models/HomeModel');

// Criando os dados na base
// HomeModel.create({
//     title: 'Hello World 2',
//     description: 'First project 2'
// })
HomeModel.find()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

exports.paginaInicial = (req, res) => {
    res.render('index');
}

exports.trataPost = (req, res) => {
    res.send(req.body);
}

