const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    telefone: { type: String, default: '' },
    endereco: {
      rua: { type: String, default: '' },
      numero: { type: String, default: '' },
      cidade: { type: String, default: '' },
      estado: { type: String, default: '' },
      cep: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cliente', ClienteSchema);
