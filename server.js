const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint para receber dados do formulário
app.post('/submit-form', (req, res) => {
    const { name, address, city, state, zip, phone } = req.body;

    // Salva os dados em um arquivo ou processa como desejar
    const data = `Nome: ${name}\nEndereço: ${address}\nCidade: ${city}\nEstado: ${state}\nCEP: ${zip}\nTelefone: ${phone}\n\n`;
    fs.appendFile('orders.txt', data, (err) => {
        if (err) throw err;
        console.log('Dados salvos.');
    });

    // Redireciona para a página de pagamento
    res.redirect('https://mpago.la/2C7k5LD');
});

// Servir a página HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
