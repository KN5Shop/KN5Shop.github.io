const express = require('express');
const app = express();
const port = 10000;

// Configura o diretório público para servir arquivos estáticos
app.use(express.static('public'));

// Endpoint para retornar dados de pedidos
app.get('/api/orders', (req, res) => {
    // Retorna uma lista de pedidos (exemplo estático)
    res.json([
        { id: 1, date: '2024-08-25', customer: 'João', status: 'Novo' }
        // Adicione mais pedidos conforme necessário
    ]);
});

// Endpoint para retornar dados de notificações
app.get('/api/notifications', (req, res) => {
    // Retorna uma lista de notificações (exemplo estático)
    res.json([
        { message: 'Novo pedido recebido!' }
        // Adicione mais notificações conforme necessário
    ]);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
