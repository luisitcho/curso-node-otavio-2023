const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <form action="/" method="POST">
            Nome: <input type="text" name="nome">
            <button>Enviar</button>
        </form>
    `);
});

app.get('/api/', (req, res) => {
    res.send('Obrigado por acessar');
})

app.post('/', (req, res) => {
    res.send('Recebi o form!');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});