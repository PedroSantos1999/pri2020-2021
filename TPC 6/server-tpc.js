var http = require('http')
var axios = require('axios')
var static = require('./static')
var { parse } = require('querystring')


// Funções auxilidares

function recuperaInfo(request, callback) {
    if(request.headers('content-type') == 'application/x-www-formurlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function geraListaTarefasStatus(respondeListaTarefasStatus, d) {
    let pageHTML = `
              <div class="w3-container w3-blue-grey">
                  <h2>Tarefas Resolvidas/Canceladas</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Descrição</th>
                      <th>Responsável</th>
                      <th>Data Limite</th>
                      <th>Estado</th>
                  </tr>
    `
    respondeListaTarefasStatus.forEach(t => {
        pageHTML +=
            ` <tr>
                  <td>${t.descricao}</td>
                  <td>${t.responsavel}</td>
                  <td>${t.datalimite}</td>
                  <td>${t.estado}</td>
              </tr>`

    });

    pageHTML += `
            </table>
            <div class="w3-container w3-teal">
                <address> Gerado por Pedro Santos::PRI2020 em ${d} --------------</address>
            </div>
        </body>
        </html>
      `
    return pageHTML
}


function geraTarefasStatus(respondeTarefasStatus) {
    let pageHTML = `
            <div class="w3-container w3-blue-grey">
                <h2>Lista de Tarefas Pendentes</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th> Descrição </th>
                    <th> Responsável </th>
                    <th> Data Limite </th>
                    <th> Marcar como Resolvida </th>
                    <th> Marcar como Cancelada </th>
                </tr>
  `
  respondeTarefasStatus.forEach(t => {
        pageHTML += `
            <td>${t.descricao}</td>
            <td>${t.responsavel}</td>
            <td>${t.datalimite}</td>
            <td style="text-align:center">
            <form action="/tarefas" method="POST"  >
                <input type="hidden" name="id" value="${t.id}"/>
                <input type="hidden" name="descricao" value="${t.descricao}"/>
                <input type="hidden" name="responsavel" value="${t.responsavel}"/>
                <input type="hidden" name="datalimite" value="${t.datalimite}"/>
                <input type="hidden" name="estado" value="resolvida"/>
                <input class="w3-button w3-green w3-circle" type="submit" value="&#10003"/>
            </form>
            </td>
            <td style="text-align:center">
            <form action="/tarefas" method="POST"  >
                <input type="hidden" name="id" value="${t.id}"/>
                <input type="hidden" name="descricao" value="${t.descricao}"/>
                <input type="hidden" name="responsavel" value="${t.responsavel}"/>
                <input type="hidden" name="datalimite" value="${t.datalimite}"/>
                <input type="hidden" name="estado" value="cancelada"/>
                <input class="w3-button w3-red w3-circle" type="submit" value="&#10008"/>
            </form>
            </td>
        </tr>`
    })
    pageHTML += ` </table>`
    return pageHTML
}

function geraNovaTarefa(respondeTarefas) {
    let pageHTML = `<html>
    <head>
        <title>Tarefas</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-blue-grey">
            <h2>Registar Nova Tarefa</h2>
        </div>
        <form class="w3-container" action="/tarefas" method="POST">
            <label class="w3-text-gray"><b>Descrição</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
            <label class="w3-text-gray"><b>Responsável</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" list="responsaveis" name="responsavel">
            <datalist id="responsaveis">
                                `

    respondeTarefas.forEach(r => {
        pageHTML += ` <option>${r.responsavel}</option> `
    })

    pageHTML += `</datalist>
            <label class="w3-text-gray"><b>Data Limite</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="datalimite">
            <input type="hidden" name="estado" value="emandamento"/>
            <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
        </form>`
    return pageHTML
}


function geraMainPage(res, d) {
    // GET responsaveis
    var requestTarefas = axios.get("http://localhost:3000/tarefas")
    // GET tarefas emandamento
    var requestTarefasStatus = axios.get("http://localhost:3000/tarefas?estado=emandamento&_sort=datalimite,responsavel&_order=asc,desc")
    // GET tarefas that the estado is not equal(_ne) emandamento  
    var requestListaTarefasStatus = axios.get("http://localhost:3000/tarefas?estado_ne=emandamento&_sort=datalimite,responsavel&_order=asc,desc")

    // Send multiple requests
    axios.all([requestTarefas, requestTarefasStatus, requestListaTarefasStatus])
        .then(axios.spread((...responses) => {
            var respondeTarefas = responses[0].data
            var respondeTarefasStatus = responses[1].data
            var respondeListaTarefasStatus = responses[2].data

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write(geraNovaTarefa(respondeTarefas))
            res.write(geraTarefasStatus(respondeTarefasStatus))
            res.write(geraListaTarefasStatus(respondeListaTarefasStatus, d))
            res.end()
        }))
        .catch(function (erro) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write("<p>Erro: Não foi possível obter a lista de tarefas!")
            res.end()
        })
}

// Server setup
var todolistServer = http.createServer(function (req, res) {
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else {
        // Normal request
        switch (req.method) {
            case "GET":
                if ((req.url == "/") || (req.url == "/tarefas")) {
                    geraMainPage(res, d)
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço. </p>")
                    res.end()
                }
                break
            case "POST":
                if (req.url == '/tarefas') {
                    recuperaInfo(req, resultado => {
                        console.log('POST de tarefas:' + JSON.stringify(resultado))
                        if (resultado.estado == 'resolvida' || resultado.estado == 'cancelada') {
                            axios.delete('http://localhost:3000/tarefas/' + resultado.id)
                                .then(response => {
                                    axios.post('http://localhost:3000/tarefas', resultado)
                                        .then(resp => {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.writeHead(302, { Location: "/" })
                                            res.end()
                                        })
                                        .catch(function (erro) {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Erro: Não foi possível alterar o estado da tarefa!")
                                            res.end()
                                        })
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Erro: Não foi possível alterar o estado da tarefa!")
                                    res.end()
                                })
                        }
                        else if (resultado.estado == 'emandamento') {
                            axios.post('http://localhost:3000/tarefas', resultado)
                                .then(response => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.writeHead(302, { Location: "/" })
                                    res.end()
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Erro: Não foi possível adicionar a tarefa!")
                                    res.end()
                                })
                        }
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p> POST " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

todolistServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')