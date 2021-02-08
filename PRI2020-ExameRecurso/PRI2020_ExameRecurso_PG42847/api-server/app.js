var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://127.0.0.1:27017/PEI2020', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function () {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});

var indexRouter = require('./routes/index');

var app = express();

app.use(function(req, res, next){
  if(req.originalUrl != '/api/token'){
    // Verifica a autorização
    const token = req.query.token;
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, "DAW-PRI-2020-recurso", function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      // Caso não haja erro ele salva o token no request para uso posterior
      req.subi = decoded.sub;
      req.datai = decoded.data;
      next();
    })
  }
  else next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({error: err.message});
});

module.exports = app;
