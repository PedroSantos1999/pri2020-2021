var express = require('express');
var router = express.Router();
var Teams = require('../controllers/teams');
var jwt = require('jsonwebtoken')

// Na parte da API, implementa o seguinte pedido: GET /api/token - devolve um token gerado no momento com o segredo "DAW-PRI-2020-recurso" e com o payload {"sub":"Exame", "data": "dataDoSistema"};
router.get('/token', function(req,res){
  var sub = "Exame"
  var data = "dataDoSistema"
  const token = jwt.sign({sub,data}, "DAW-PRI-2020-recurso",{
      expiresIn: 3600 // expires in 1h
    });
    return res.status(200).json({ token: token });
  }
)

// GET /api/teams - Devolve a lista de equipes, com os campos: _id, team, pitch1, pitch2, techPitch, businessReport, techReport, e nmembers (número de membros da equipe);
router.get('/teams', function(req, res) {
  Teams.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/teams/:id', function(req, res) {
  if(req.params.id) { // GET /api/teams/:id - Devolve toda a informação de uma equipe (o registo completo em JSON);
    Compra.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
  else { // GET /api/teams/:id/members/:idMember - Devolve a informação de um membro da equipe
    Compra.consultarMember(req.params.idMember)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
  }
});

// POST /api/teams - Insere uma equipe na base de dados 
router.post('/teams', (req, res) => {
  Compra.insert(req.body)
    .then(data => res.status(200).json({message: data._id}))
    .catch(e => res.status(404).jsonp({error: e})) 
});

// POST /api/teams/:id/members - Insere um novo membro numa determinada equipe
router.post('/teams/:id/members', (req, res) => {
  Compra.insertMember(req.body,req.params.id)
    .then(data => res.status(200).json({message: data._id}))
    .catch(e => res.status(404).jsonp({error: e})) 
});

// DELETE /api/teams/:id - Apaga uma equipe, devolve um booleano como resultado
router.delete('/teams/:id', (req, res) => {
  Compra.remove(req.params.id)
    .then(data => {
      console.log(data)
      if(data.n == 0)
        res.status(200).json({message: false})
      else
      res.status(200).json({message: true})
    })
    .catch(e => res.status(404).jsonp({message: false}))
})

// DELETE /api/teams/:id/members/:idMember - Apaga um membro duma equipe, devolve um booleano como resultado
router.delete('/teams/:id/members/:idMember', (req, res) => {
  console.log(req.params.idTeam)
  console.log(req.params.idMember)
  Teams.removeMember(req.params.id,req.params.idMember)
    .then(data => {
      console.log(data)
      if(data.nModified == 0)
        res.status(200).json({message: false})
      else
      res.status(200).json({message: true})
    })
    .catch(e => res.status(404).jsonp({message: e}))
})

module.exports = router;
