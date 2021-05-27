const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Get todos Pedidos!'
  });
})
router.get('/:idOrder', (req, res, next) => {
  const id = req.params.idOrder
  if (id ==='especial') {
    res.status(200).send({
      mensagem: 'Get pedido pelo id!',
      id: id
    });
  } else {
    res.status(200).send({
      mensagem: 'Voce passou o id',
  });
}
})
module.exports = router;