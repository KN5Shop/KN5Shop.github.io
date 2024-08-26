const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 10000;

// Middleware para analisar dados JSON
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Armazena pedidos em memória (pode ser substituído por um banco de dados)
const orders = [];

// Rota para receber pedidos
app.post('/api/orders', (req, res) => {
    const { name, service } = req.body;
    if (name && service) {
        const order = {
            id: orders.length + 1,
            date: new Date().toISOString(),
            customer: name,
            service: service,
            status: 'Pendente'
        };
        orders.push(order);
        res.status(200).json({ message: 'Pedido recebido com sucesso!' });
    } else {
        res.status(400).json({ message: 'Dados do pedido inválidos.' });
    }
});

// Rota para enviar pedidos para a página de administração
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Defina a rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'painel.html'));
});

// Defina a rota para a página de administração
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
