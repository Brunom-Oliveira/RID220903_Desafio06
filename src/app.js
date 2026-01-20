const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');
const estoqueRoutes = require('./routes/estoque');
const pedidosRoutes = require('./routes/pedidos');
const vendasRoutes = require('./routes/vendas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/vendas', vendasRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;
