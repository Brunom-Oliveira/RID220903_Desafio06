const express = require('express');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { produtoId, quantidade, localizacao } = req.body;
    const produto = await Produto.findById(produtoId);
    if (!produto) {
      return res.status(404).json({ error: 'Produto nao encontrado' });
    }

    const estoque = await Estoque.findOneAndUpdate(
      { produto: produtoId },
      { quantidade, localizacao, produto: produtoId },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json(estoque);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const estoque = await Estoque.find().populate('produto');
    res.json(estoque);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const estoque = await Estoque.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!estoque) {
      return res.status(404).json({ error: 'Estoque nao encontrado' });
    }
    res.json(estoque);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
