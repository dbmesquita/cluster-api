const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/:cgc', (req, res, next) =>{
  mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
          `select nfe as "Nota Fiscal"
          , DATE_FORMAT (dtemissao,'%d/%m/%Y') as "Data de Emissão" 
          , DATE_FORMAT (dtvenc,'%d/%m/%Y') as "Data de Vencimento"
          , valor as "Valor em Aberto"
          , replace(linhadigformat,'  ', ' ') as "Linha Digitável" 
          from tickets 
          where dtpag is  null
          and dtcancel is null
          and linhadigitavel is not null
          and cgc = ?;`,
          [req.params.cgc],
          (error, result, fields) =>{

            conn.release();

            if (error) { return res.status(500).send({ error: error}) }
            
            if (result.length ==0){
              return res.status(404).send({mensagem:'Não encontrado Titulos em Aberto'})
            }
            return res.status(200).send({response: result})
           }
          )
      });   
});


module.exports = router;

