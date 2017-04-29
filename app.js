// Demandes de modules 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var offres = require('./routes/offres');
var formulaire = require('./routes/insert');
var Event = require('./routes/Event');
var postulation = require('./routes/postulation');

// Définition de la variable générale "moteur" du modulre Express 
var app = express();

// Positionnement des vues avec Pug comme moteur de template pour le rendu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Itégration des chemins et modulles au niveau de l'application 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/project'; 
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

// Asociation entre l'URL demandée et la route à suivre avec le contrôleur associé 
app.use('/', index);
app.use('/offres', offres);
app.use('/insert',formulaire);
app.use('/Event',Event);
app.use('/postulation',postulation);

// Gestion des erreurs
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exportation es modules pour pouvoir les utiliser
module.exports = app;
