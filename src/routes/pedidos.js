const express = require('express');
const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');
const { buildItens } = require('./helpers');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { clienteId, itens } = req.body;
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }

    const resultado = await buildItens(itens);
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }

    const pedido = await Pedido.create({
      cliente: clienteId,
      itens: resultado.itens,
      total: resultado.total,
    });

    res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate('itens.produto');
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente')
      .populate('itens.produto');
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido nao encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido nao encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
