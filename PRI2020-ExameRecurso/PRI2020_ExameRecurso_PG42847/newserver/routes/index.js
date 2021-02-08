var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  axios.get('http://localhost:8001/api/teams?token=' + req.cookies.token)
    .then(dados => res.render('index', {title: "Recurso PRI e DAW",dados: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

router.get('/lista/:id', function(req, res, next) {
  axios.get('http://localhost:8001/api/teams/' + req.params.id + '?token=' + req.cookies.token)
    .then(dados => res.render('teams', {title: "Segredo: Recurso PRI e DAW",dados: dados.data}))
    .catch(e => res.render('error', {error: e}));
});

module.exports = router;