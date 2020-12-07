var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

// set logger
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// serve static files
app.use(express.static('public'))

app.get(['/files', '/'], function(req, res){
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files))
    res.write(templates.fileForm())
    res.end()
})

app.get('/download/:filename', function(req, res){
    res.download(__dirname + '/public/fileStore/' + req.params.filename)
})

app.post('/files', upload.array('myFile'), function(req, res){
    // req.files is the 'myFile' files
    // req.body will hold the text fields if any
    // for several req.files
    for (var i = 0; i < req.files.length; i++) {
        let quarantinePath = __dirname + '/' + req.files[i].path
        let newPath = __dirname + '/public/fileStore/' + req.files[i].originalname

        // transfers the file from the uploads folder to the fileStore
        fs.rename(quarantinePath, newPath, function (err) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                })
                res.write('<p>Erro: ao mover o ficheiro da quarentena:' + err + '</p>')
                res.end()
            }
        })

        var d = new Date().toISOString().substr(0, 16)

        // get the files in database
        var filesdb = jsonfile.readFileSync('./dbFiles.json')

        // add the file that we are iterating
        filesdb.push({
            date: d,
            name: req.files[i].originalname,
            mimetype: req.files[i].mimetype,
            size: req.files[i].size
        })

        // write in database 
        jsonfile.writeFileSync('./dbFiles.json', filesdb)

    }

    // redirect in the end to main page
    res.redirect('/')
})


app.listen(7701, () => console.log('Servidor está à escuta na porta 7701...'))