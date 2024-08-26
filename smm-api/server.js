const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket para envio de notificações em tempo real
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Simular envio de novos pedidos com mais detalhes
    setInterval(() => {
        const order = {
            type: 'order',
            id: Math.floor(Math.random() * 1000), // ID aleatório para o pedido
            date: new Date().toISOString().split('T')[0], // Data atual
            customer: 'João da Silva', // Nome do cliente
            service: '1000 seguidores mundiais 🌍', // Serviço escolhido
            status: 'Pendente' // Status do pedido
        };
        ws.send(JSON.stringify(order));
    }, 15000);

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
