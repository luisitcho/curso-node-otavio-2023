exports.paginaInicial = (req, res) => {
    // req.session.usuario = { nome: 'Luis', logado: true };
    console.log(req.session.usuario);
    console.log(req.flash('error'), req.flash('success'), req.flash('info'));
    res.render('index', {
        title: 'Page title',
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
}

exports.trataPost = (req, res) => {
    res.send(req.body);
}

