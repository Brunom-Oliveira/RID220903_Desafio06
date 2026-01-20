const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema(
  {
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true, unique: true },
    quantidade: { type: Number, required: true, min: 0 },
    localizacao: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Estoque', EstoqueSchema);
