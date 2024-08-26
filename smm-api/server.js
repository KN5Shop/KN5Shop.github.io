const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 10000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rotas da API
// Exemplo de rota para obter todos os serviços
app.get('/api/servicos', (req, res) => {
  db.all('SELECT * FROM servicos', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Exemplo de rota para adicionar um novo serviço
app.post('/api/servicos', (req, res) => {
  const { nome, preco, descricao } = req.body;
  db.run('INSERT INTO servicos (nome, preco, descricao) VALUES (?, ?, ?)', [nome, preco, descricao], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
