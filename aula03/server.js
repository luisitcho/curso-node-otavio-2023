const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/" method="POST">
            Nome: <input type="text" name="nome">
            <button>Enviar</button>
        </form>
    `);
});

app.get('/api/:user?', (req, res) => {
    // console.log(req.params);
    // console.log(req.query);
    res.send(req.query);
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send(`Recebi: ${req.body.nome}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});