exports.myMiddleware = (req, res, next) => {
    if (req.body.nome) console.log(`Passou o nome: ${req.body.nome}`);
    res.locals.localVariable = 'This is the value of the local variable';
    next();
};

exports.checkCsurfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) return res.render('404');
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}