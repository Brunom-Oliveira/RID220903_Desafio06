const express = require('express');
const Venda = require('../models/Venda');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Estoque = require('../models/Estoque');
const { buildItens } = require('./helpers');

const router = express.Router();

async function baixarEstoque(itens) {
  const operacoes = itens.map((item) => (
    Estoque.findOneAndUpdate(
      { produto: item.produto },
      { $inc: { quantidade: -item.quantidade } },
      { new: true }
    )
  ));

  await Promise.all(operacoes);
}

router.post('/', async (req, res, next) => {
  try {
    const { clienteId, itens, pedidoId, forma_pagamento } = req.body;
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }

    if (pedidoId) {
      const pedido = await Pedido.findById(pedidoId);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido nao encontrado' });
      }
    }

    const resultado = await buildItens(itens);
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }

    const venda = await Venda.create({
      cliente: clienteId,
      pedido: pedidoId,
      itens: resultado.itens,
      total: resultado.total,
      forma_pagamento: forma_pagamento || '',
    });

    await baixarEstoque(resultado.itens);

    res.status(201).json(venda);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const vendas = await Venda.find().populate('cliente').populate('pedido').populate('itens.produto');
    res.json(vendas);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const venda = await Venda.findById(req.params.id)
      .populate('cliente')
      .populate('pedido')
      .populate('itens.produto');
    if (!venda) {
      return res.status(404).json({ error: 'Venda nao encontrada' });
    }
    res.json(venda);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
