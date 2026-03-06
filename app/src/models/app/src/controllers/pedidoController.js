const Pedido = require('../models/Pedido');

// POST /order
exports.createPedido = async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!dataCriacao) {
      return res.status(400).json({ erro: "dataCriacao é obrigatória." });
    }

    const pedidoExistente = await Pedido.findOne({ numeroPedido });
    if (pedidoExistente) {
      return res.status(409).json({ erro: "Pedido com esse número já existe." });
    }

    const novoPedido = new Pedido({
      numeroPedido,
      valorTotal: Number(valorTotal),
      dataCriacao: new Date(dataCriacao),
      items
    });

    await novoPedido.save();

    res.status(201).json(novoPedido);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /order/:id (ex: v10089016vdb)
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findOne({ numeroPedido: id });
    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    res.status(200).json(pedido);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// GET /order/list
exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// PUT /order/:id
exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { valorTotal, items } = req.body;

    const pedido = await Pedido.findOne({ numeroPedido: id });
    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    if (valorTotal !== undefined) pedido.valorTotal = Number(valorTotal);
    if (items !== undefined) pedido.items = items;

    pedido.markModified('items');

    await pedido.save();

    res.status(200).json(pedido);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// DELETE /order/:id
exports.deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findOneAndDelete({ numeroPedido: id });
    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    res.status(200).json({ mensagem: "Pedido removido." });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
