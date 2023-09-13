module.exports = (req, res, next) => {
    if (req.body.nome) console.log(`Passou o nome: ${req.body.nome}`);
    res.locals.localVariable = 'This is the value of the local variable';
    next();
};