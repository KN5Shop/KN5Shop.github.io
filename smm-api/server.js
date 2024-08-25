const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let balance = 1000; // Exemplo de saldo
let services = [
  { service: 1, name: 'Serviço A', type: 'Tipo 1', category: 'Categoria 1', rate: 10, min: 1, max: 100 },
  { service: 2, name: 'Serviço B', type: 'Tipo 2', category: 'Categoria 2', rate: 20, min: 5, max: 50 },
  // Adicione mais serviços conforme necessário
];

// Rota para obter o saldo
app.post('/api/balance', (req, res) => {
  res.json({ balance, currency: 'BRL' });
});

// Rota para obter serviços
app.post('/api/services', (req, res) => {
  res.json(services);
});

// Rota para adicionar um pedido
app.post('/api/add', (req, res) => {
  const { service, quantity, url } = req.body;
  // Simular a adição do pedido e retornar um ID fictício
  const orderId = Math.floor(Math.random() * 1000);
  res.json({ order: orderId });
});

// Rota para obter o status do pedido
app.post('/api/status', (req, res) => {
  const { order } = req.body;
  // Simular o status do pedido
  res.json({ status: 'Em andamento', remains: 10 });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
