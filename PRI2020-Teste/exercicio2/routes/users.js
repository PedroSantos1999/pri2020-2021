var express = require('express');
var router = express.Router();

var passport = require('passport')
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({ username: req.user.username, level: req.user.level, 
              sub: 'Teste de PRI2020'}, 
              "PRI2020",
              {expiresIn: 30},
              function(e, token) {
                if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                else res.status(201).jsonp({token: token})
  });
})

module.exports = router;
