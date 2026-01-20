const mongoose = require('mongoose');

const VendaItemSchema = new mongoose.Schema(
  {
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true, min: 1 },
    preco_unitario: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const VendaSchema = new mongoose.Schema(
  {
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
    itens: { type: [VendaItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    forma_pagamento: { type: String, default: '' },
    data_venda: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venda', VendaSchema);
