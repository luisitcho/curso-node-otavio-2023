exports.paginaInicial = (req, res) => {
    // req.session.usuario = { nome: 'Luis', logado: true };
    console.log(req.session.usuario);
    console.log(req.flash('error'), req.flash('success'), req.flash('info'));
    res.render('index');
}

exports.trataPost = (req, res) => {
    res.send(req.body);
}

