module.exports = (req, res, next) => {
    if (req.body.nome) console.log(`Passou o nome: ${req.body.nome}`);
    next();
};