const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// Enviar arquivo HTML quando acessar a rota principal
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

// WebSocket connection
wss.on('connection', function connection(ws) {
    console.log('Cliente conectado ao WebSocket.');

    // Enviar uma notificação a cada 10 segundos como teste
    setInterval(() => {
        const notification = {
            type: 'notification',
            message: 'Nova notificação recebida!'
        };
        ws.send(JSON.stringify(notification));
    }, 10000);

    // Enviar um novo pedido a cada 15 segundos como teste
    setInterval(() => {
        const order = {
            type: 'order',
            id: Math.floor(Math.random() * 1000),
            date: new Date().toISOString().split('T')[0],
            customer: 'Cliente Teste',
            status: 'Pendente'
        };
        ws.send(JSON.stringify(order));
    }, 15000);

    // Ao desconectar
    ws.on('close', () => {
        console.log('Cliente desconectado do WebSocket.');
    });
});

// Configurar a porta para o servidor
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
