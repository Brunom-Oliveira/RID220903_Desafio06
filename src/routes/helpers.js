const Produto = require('../models/Produto');

async function buildItens(itensInput) {
  if (!Array.isArray(itensInput) || itensInput.length === 0) {
    return { itens: [], total: 0, error: 'Itens invalidos' };
  }

  const ids = itensInput.map((item) => item.produtoId);
  const produtos = await Produto.find({ _id: { $in: ids } });
  if (produtos.length !== ids.length) {
    return { itens: [], total: 0, error: 'Produto nao encontrado' };
  }

  const mapa = new Map(produtos.map((produto) => [String(produto._id), produto]));

  const itens = itensInput.map((item) => {
    const produto = mapa.get(String(item.produtoId));
    const quantidade = Number(item.quantidade || 0);
    const preco = Number(produto.preco || 0);
    const subtotal = quantidade * preco;

    return {
      produto: produto._id,
      quantidade,
      preco_unitario: preco,
      subtotal,
    };
  });

  if (itens.some((item) => item.quantidade <= 0)) {
    return { itens: [], total: 0, error: 'Quantidade invalida' };
  }

  const total = itens.reduce((acc, item) => acc + item.subtotal, 0);
  return { itens, total, error: null };
}

module.exports = { buildItens };
