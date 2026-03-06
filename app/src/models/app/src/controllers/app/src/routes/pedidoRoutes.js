const express = require('express');
const {
  createPedido,
  getPedidoById,
  getAllPedidos,
  atualizarPedido,
  deletarPedido
} = require('../controllers/pedidoController');

const router = express.Router();

// Obrigatório
router.post('/order', createPedido);
router.get('/order/:id', getPedidoById);

// Opcional
router.get('/order/list', getAllPedidos);
router.put('/order/:id', atualizarPedido);
router.delete('/order/:id', deletarPedido);

module.exports = router;
