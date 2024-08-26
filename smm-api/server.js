const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');

const app = express();
const port = 10000;
const db = new sqlite3.Database('database.db');

app.use(express.json());
app.use(express.static('public'));

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Novo cliente conectado');

    // Enviar dados para o cliente a cada 10 segundos
    setInterval(() => {
        db.all('SELECT * FROM notifications', [], (err, notifications) => {
            if (err) {
                console.error('Erro ao buscar notificações:', err.message);
            } else {
                ws.send(JSON.stringify({ type: 'notifications', data: notifications }));
            }
        });

        db.all('SELECT * FROM orders', [], (err, orders) => {
            if (err) {
                console.error('Erro ao buscar pedidos:', err.message);
            } else {
                ws.send(JSON.stringify({ type: 'orders', data: orders }));
            }
        });
    }, 10000); // 10 segundos
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
