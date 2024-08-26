const express = require('express');
const path = require('path');
const app = express();
const port = 10000;

// Configurar o middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rotas da API e outras configurações
// ...

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
