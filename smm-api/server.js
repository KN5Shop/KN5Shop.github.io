const express = require('express');
const path = require('path');
const db = require('./database'); // Importa o banco de dados
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
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/services', (req, res) => {
    db.all('SELECT * FROM services', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/notifications', (req, res) => {
    db.all('SELECT * FROM notifications', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
