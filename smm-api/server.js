const express = require('express');
const path = require('path');
const app = express();
const port = 10000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve a API para obter pedidos
app.get('/api/orders', (req, res) => {
    // Simulação de dados para pedidos
    const orders = [
        { id: 1, name: 'João', date: '2024-08-25', service: '500 seguidores mundiais', status: 'Em andamento' },
        { id: 2, name: 'Maria', date: '2024-08-26', service: '1000 seguidores mundiais', status: 'Concluído' },
    ];
    res.json(orders);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
