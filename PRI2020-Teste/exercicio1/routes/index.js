var express = require('express');
var router = express.Router();
var Casamentos = require('../controllers/casamentos');

router.get('/casamentos', function(req, res, next) {
  if (req.query.title) {
      Casamentos.consultByName(req.query.title).then(dados => {
            res.jsonp(dados);
      }).catch(erro => {
            res.status(500).jsonp(erro);
      });
  }else if (req.query.date) {
    if (req.query.date == true) {
      Casamentos.consultListByYear(req.query.date).then(dados => {
        res.jsonp(dados);
      }).catch(erro => {
        res.status(500).jsonp(erro);
      });
    }else{
      Casamentos.consultByYear(req.query.date).then(dados => {
        res.jsonp(dados);
      }).catch(erro => {
        res.status(500).jsonp(erro);
      });
    }
  }else {
    Casamentos.list().then(dados => {
      res.jsonp(dados);
  }).catch(erro => {
      res.status(500).jsonp(erro);
  });
  }
});

router.get('/casamentos/:id', function (req, res) {
  Casamentos.consult(req.params.id).then(dados => {
      res.jsonp(dados);
  }).catch(erro => {
      res.status(500).jsonp(erro);
  });
});

router.get('/casamentos/noivos', function (req, res) {
  Casamentos.listMarriages().then(dados => {
    dados.sort();
    res.jsonp(dados);
}).catch(erro => {
    res.status(500).jsonp(erro);
});
});

module.exports = router;
