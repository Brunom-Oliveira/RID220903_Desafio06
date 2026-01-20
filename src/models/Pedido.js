const mongoose = require('mongoose');

const PedidoItemSchema = new mongoose.Schema(
  {
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true, min: 1 },
    preco_unitario: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const PedidoSchema = new mongoose.Schema(
  {
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    itens: { type: [PedidoItemSchema], required: true },
    status: {
      type: String,
      enum: ['aberto', 'pago', 'enviado', 'cancelado'],
      default: 'aberto',
    },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pedido', PedidoSchema);
