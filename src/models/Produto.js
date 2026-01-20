const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, default: '' },
    preco: { type: Number, required: true, min: 0 },
    categoria: { type: String, default: '' },
    sku: { type: String, unique: true, sparse: true },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produto', ProdutoSchema);
