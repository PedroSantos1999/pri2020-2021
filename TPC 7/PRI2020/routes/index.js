var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno');

// GET da página principal
router.get(['/alunos', '/'], function (req, res, next) {
    Aluno.listar()
        .then(dados => res.render('index', {
            lista: dados
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})

router.get('/alunos/registar', function (req, res, next) {
    res.render('form')
})


router.get('/alunos/:id', function (req, res, next) {
    Aluno.consultar(req.params.id)
        .then(aluno => res.render('aluno', {
            aluno
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})

router.get('/alunos/editar/:id', function (req, res, next) {
    Aluno.consultar(req.params.id)
        .then(aluno => res.render('atualizar', {
            aluno
        }))
        .catch(e => res.render('error', {
            error: e
        }))
})
 
router.post('/alunos', function (req, res, next) {
    Aluno.inserir(req)
        .then(dados => {
            console.log("Aluno gravado com sucesso...")
            res.redirect("/alunos/" + dados._id)
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

// Pedido PUT de um aluno atualizado
router.put("/alunos/:id", function (req, res, next) {
    Aluno.atualizar(req.params.id, req.body)
        .then(dados => {
            console.log("Aluno atualizado com sucesso...")
            res.sendStatus(200)
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

router.put("/alunos/addtpc/:id", function (req, res, next) {
    Aluno.addTPC(req.params.id)
        .then(dados => {
            console.log("Adicionado TPC...")
            res.sendStatus(200)
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

router.put("/alunos/remtpc/:id", function (req, res, next) {
    Aluno.removeTPC(req.params.id)
        .then(dados => {
            console.log("Removido TPC...")
            res.sendStatus(200)
        })
        .catch(e => res.render('error', {
            error: e
        }))
})

router.delete("/alunos/:id", function (req, res, next) {
    Aluno.eliminar(req.params.id)
        .then(dados => {
            console.log("Aluno eliminado com sucesso...")
            res.sendStatus(200)
        })
        .catch(e => res.render('error', {
            error: e
        }))
})


module.exports = router;