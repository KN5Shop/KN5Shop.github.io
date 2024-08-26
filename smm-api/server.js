const express = require('express');
const path = require('path');
const app = express();
const port = 10000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Rota para obter usuários
app.get('/api/users', (req, res) => {
    // Dados simulados
    const users = [
        { id: 1, name: 'João', email: 'joao@example.com', status: 'Ativo' },
        { id: 2, name: 'Maria', email: 'maria@example.com', status: 'Inativo' },
    ];
    res.json(users);
});

// Rota para obter serviços
app.get('/api/services', (req, res) => {
    // Dados simulados
    const services = [
        { id: 1, name: '500 seguidores mundiais', description: 'Aumente sua presença global', price: 'R$5.00' },
        { id: 2, name: '1000 seguidores mundiais', description: 'Aumente ainda mais sua presença', price: 'R$10.00' },
    ];
    res.json(services);
});

// Rota para obter pedidos
app.get('/api/orders', (req, res) => {
    // Dados simulados
    const orders = [
        { id: 1, date: '2024-08-20', name: 'João', service: '500 seguidores mundiais', status: 'Completo' },
        { id: 2, date: '2024-08-21', name: 'Maria', service: '1000 seguidores mundiais', status: 'Pendente' },
    ];
    res.json(orders);
});

// Rota para obter notificações
app.get('/api/notifications', (req, res) => {
    // Dados simulados
    const notifications = [
        { id: 1, message: 'Novo pedido recebido.' },
        { id: 2, message: 'Atualização no status do pedido.' },
    ];
    res.json(notifications);
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
