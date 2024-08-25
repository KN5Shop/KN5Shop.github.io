const express = require('express');
const app = express();
const path = require('path');

// Porta em que o servidor vai rodar
const PORT = 10000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.get('/api/notifications', (req, res) => {
    // Simulação de resposta de notificação
    res.json({ message: 'Notificações carregadas com sucesso!' });
});

// Página de administração
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Roteador para outras páginas (Serviços, Pedidos, etc.)
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

app.get('/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notifications.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
});
