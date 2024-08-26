const express = require('express');
const path = require('path');
const app = express();
const port = 10000;

// Serve arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para o painel de administração
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/admin/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});
app.get('/admin/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});
app.get('/admin/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});
app.get('/admin/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notifications.html'));
});

// API endpoints
app.get('/api/users', (req, res) => {
    // Aqui você deve retornar uma lista de usuários
    res.json([]);
});
app.get('/api/services', (req, res) => {
    // Aqui você deve retornar uma lista de serviços
    res.json([]);
});
app.get('/api/orders', (req, res) => {
    // Aqui você deve retornar uma lista de pedidos
    res.json([]);
});
app.get('/api/notifications', (req, res) => {
    // Aqui você deve retornar uma lista de notificações
    res.json([]);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
