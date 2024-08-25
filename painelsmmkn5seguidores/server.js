// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Substitua com sua API Key do WasSMM
const apiKey = '3d735244d9c3476f8f28d95d93aac5e93728ae68';

// Middleware para JSON
app.use(express.json());

// Endpoint para criar pedido
app.post('/new-order', async (req, res) => {
  const { service, url, quantity } = req.body;

  try {
    const response = await axios.post('https://www.wassmm.online/api/v2', {
      key: apiKey,
      action: 'add',
      service,
      url,
      quantity
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter lista de serviços
app.get('/services', async (req, res) => {
  try {
    const response = await axios.post('https://www.wassmm.online/api/v2', {
      key: apiKey,
      action: 'services'
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para verificar status de pedido
app.post('/status', async (req, res) => {
  const { order } = req.body;

  try {
    const response = await axios.post('https://www.wassmm.online/api/v2', {
      key: apiKey,
      action: 'status',
      order
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
