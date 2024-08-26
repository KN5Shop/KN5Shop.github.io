const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Configurando o app express
const app = express();
const server = http.createServer(app);

// Iniciando WebSocket
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Clientes conectados
let adminSocket = null;
let clients = [];

// Escutando conexões WebSocket
wss.on('connection', (ws, req) => {
    const url = req.url;

    // Verificar se é a conexão do painel de admin
    if (url === '/admin') {
        adminSocket = ws;
        ws.on('close', () => {
            adminSocket = null;
        });
    } else {
        clients.push(ws);
        ws.on('message', (message) => {
            console.log('Recebido:', message);
            
            // Enviar mensagens ao admin
            if (adminSocket && adminSocket.readyState === WebSocket.OPEN) {
                adminSocket.send(message);
            }
        });

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
        });
    }
});

// Servir a página admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Iniciar servidor na porta 10000
server.listen(10000, () => {
    console.log('Servidor rodando na porta 10000');
});
