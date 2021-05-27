const express = require ( 'express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const rotaTicket = require('./routes/ticket');
const rotaOrder = require('./routes/order');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(bodyParser.text());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET');
      return res.status(200).send({});
  }
  next();
});


app.use('/ticket', rotaTicket);
app.use('/order', rotaOrder);

app.use((req, res, next) =>{
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});


app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.mensagem
      } 
    });
});
module.exports = app;