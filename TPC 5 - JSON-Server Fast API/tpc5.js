var http = require('http')
const axios = require('axios');

var servidor = http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)

    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<style> h1{text-align:center;font-size:70px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
            res.write('<body>')
            res.write('<h1>Escola de Música</h1>')
            res.write('<ul>')
            res.write('<li><b><a style="font-weight:bold" href=\"http://localhost:3001/alunos">Lista de alunos</a></b></li>')
            res.write('<li><b><a style="font-weight:bold" href=\"http://localhost:3001/cursos">Lista de cursos</a></b></li>')
            res.write('<li><b><a style="font-weight:bold" href=\"http://localhost:3001/instrumentos">Lista de instrumentos</a></b></li>')
            res.write('</ul>')
            res.write('<footer>')
            res.write('<p>Pedro Afonso Rodrigues Santos; pg42847; MEI - 4º ano - 1º Semestre - PRI 20/21</p>')
            res.write('<p>Email: <a href="mailto:pg42847@alunos.uminho.pt">pg42847@alunos.uminho.pt</a> </p>')
            res.write('<p>Github: <a href="https://github.com/PedroSantos1999/pri2020-2021" target="_blank">PedroSantos1999</p>')
            res.write('<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" alt="Github" style="width:100px;height:50px;"></img></a>')
            res.write('</footer>')
            res.write('</body>')
            res.end()
        }
        else if (req.url == '/alunos') {
            axios.get('http://localhost:3000/alunos')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Alunos </title> </head>')
                    res.write('<body>')
                    res.write('<u> <h3>Lista de Alunos: </h3> </u>')
                    alunos = resp.data;
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write(`<li> <b> <a style="font-weight:bold" href=\"http://localhost:3001/alunos/${a.id}\"> ${a.id} : ${a.nome} </a> </b> </li>`)
                    });
                    res.write('</ul>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001\">Voltar ao índice </a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção da lista de alunos: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url == '/cursos') {
            axios.get('http://localhost:3000/cursos')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Cursos </title> </head>')
                    res.write('<body>')
                    res.write('<u> <h3>Lista de Cursos: </h3> </u>')
                    cursos = resp.data;
                    res.write('<ul>')
                    cursos.forEach(c => {
                        res.write(`<li> <b> <a style="font-weight:bold" href=\"http://localhost:3001/cursos/${c.id}\"> ${c.id} : ${c.designacao} </b> </li>`)
                    });
                    res.write('</ul>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001\">Voltar ao índice </a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção da lista de cursos: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url == '/instrumentos') {
            axios.get('http://localhost:3000/instrumentos')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Instrumentos </title> </head>')
                    res.write('<body>')
                    res.write('<u> <h3>Lista de Instrumentos: </h3> </u>')
                    instrumentos = resp.data;
                    res.write('<ul>')
                    instrumentos.forEach(i => {
                        res.write(`<li> <b> <a style="font-weight:bold" href=\"http://localhost:3001/instrumentos/${i.id}\"> ${i.id} : ${i.text} </b> </li>`)
                    });
                    res.write('</ul>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001\">Voltar ao índice </a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção da lista de instrumentos: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url.match(/\/alunos\/[A]([E][\-])?[0-9]{2,5}\/curso\/[C][BS][0-9]{1,2}/)) {
            var splits = req.url.split("/")
            console.log(splits[4])
            axios.get('http://localhost:3000/cursos?q=' + splits[4] + '&_limit=1')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Aluno ' + splits[2] + ' - Curso: ' + splits[4] + '</title></head>')
                    res.write('<meta name="viewport" content="width=device-width, initial-scale=1"/>')
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<body><div class="w3-container">')
                    res.write('<table class="w3-table-all w3-card-4">')
                    cursos = resp.data;
                    res.write('<ul>')
                    cursos.forEach(c => {
                        res.write(`<tr><th>Id: </th><td> ${c.id} </td</tr>`);
                        res.write(`<tr><th>Designação: </th><td> ${c.designacao} </td</tr>`);
                        res.write(`<tr><th>Duração: </th><td> ${c.duracao} </td</tr>`);
                        res.write(`<tr><th>Instrumento: </th><td> ${c.instrumento.id} : ${c.instrumento.text} </td</tr>`);
                    });
                    res.write('</ul>')
                    res.write('</table></div>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001/alunos/' + splits[2] + '\">Voltar ao aluno</a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção do aluno e curso: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url.match(/\/cursos\/[C][BS][0-9]{1,2}\/listaalunos/)) {
            var splits = req.url.split("/")
            axios.get('http://localhost:3000/alunos?curso=' + splits[2] + '&_sort=anoCurso')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Curso ' + splits[2] + ' - Lista de Alunos</title></head>')
                    res.write('<meta name="viewport" content="width=device-width, initial-scale=1"/>')
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<body><div class="w3-container">')
                    res.write('<table class="w3-table-all w3-card-4">')
                    alunos = resp.data;
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write(`<li> <b> ${a.id} : ${a.nome} : Ano - ${a.anoCurso} </b> </li>`)
                    });
                    res.write('</ul>')
                    res.write('</table></div>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001/cursos/' + splits[2] + '\">Voltar ao curso</a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção do aluno e curso: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url.match(/\/alunos\/[A]([E][\-])?[0-9]{2,5}/)) {
            var splits = req.url.split("/")
            axios.get('http://localhost:3000/alunos?q=' + splits[2])
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Aluno: ' + splits[2] + '</title></head>')
                    res.write('<meta name="viewport" content="width=device-width, initial-scale=1"/>')
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<body><div class="w3-container">')
                    res.write('<table class="w3-table-all w3-card-4">')
                    alunos = resp.data;
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write(`<tr><th>Id: </th><td> ${a.id} </td</tr>`);
                        res.write(`<tr><th>Nome: </th><td> ${a.nome} </td</tr>`);
                        res.write(`<tr><th>Data de Nascimento: </th><td> ${a.dataNasc} </td</tr>`);
                        res.write(`<tr><th>Curso: </th><td> <a style="font-weight:bold" href=\"http://localhost:3001/alunos/${a.id}/curso/${a.curso}\"> ${a.curso} </a> </td</tr>`);
                        res.write(`<tr><th>Ano: </th><td> ${a.anoCurso} </td</tr>`);
                        res.write(`<tr><th>Instrumento: </th><td> ${a.instrumento} </td</tr>`);
                    });
                    res.write('</ul>')
                    res.write('</table></div>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001/alunos\">Voltar à lista de alunos</a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção do aluno e curso: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
        else if (req.url.match(/\/cursos\/[C][BS][0-9]{1,2}/)) {
            var splits = req.url.split("/")
            axios.get('http://localhost:3000/cursos?q=' + splits[2] + '&_limit=1')
                .then(resp => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write('<style> h1{text-align:center;font-size:50px;} h3{margin-left:13px;} body{background-color:White;} footer{text-align:center;padding:3px;position:fixed;left:0;bottom:0;width:100%;} a:link{text-decoration:none;} a:hover{text-decoration:underline;} a:active{text-decoration:underline;} </style>')
                    res.write('<head> <title>Escola de música - Curso: ' + splits[2] + '</title></head>')
                    res.write('<meta name="viewport" content="width=device-width, initial-scale=1"/>')
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<body><div class="w3-container">')
                    res.write('<table class="w3-table-all w3-card-4">')
                    cursos = resp.data;
                    res.write('<ul>')
                    cursos.forEach(c => {
                        res.write(`<tr><th>Id: </th><td> ${c.id} </td</tr>`);
                        res.write(`<tr><th>Designação: </th><td> ${c.designacao} </td</tr>`);
                        res.write(`<tr><th>Duração: </th><td> ${c.duracao} </td</tr>`);
                        res.write(`<tr><th>Instrumento: </th><td> ${c.instrumento.id} : ${c.instrumento.text} </td</tr>`);
                        res.write(`<tr><th> <a href=\"http://localhost:3001/cursos/${c.id}/listaalunos\"> Lista de Alunos  </a> </th><td>`)
                    });
                    res.write(`</td</tr>`)
                    res.write('</ul>')
                    res.write('</table></div>')
                    res.write('<footer><address>[<a href=\"http://localhost:3001/cursos\">Voltar à lista de cursos</a>]</address></footer>');
                    res.write('</body>')
                    res.end();
                })
                .catch(error => {
                    console.log('Erro na obtenção do aluno e curso: ' + error);
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                });
        }
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
})

servidor.listen(3001)
console.log('Servidor à escuta na porta 3001...')