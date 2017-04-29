var express = require('express');
var router = express.Router();
var Offre = require('../models/offre');



router.get('/', function(req, res, next) {    
    Offre.distinct('offreNom',function(e,docs){
        res.render('Event', {
            "title" : "Liste des événements",
            "eventlist" : docs
        });
    });
});




router.get('/mort', function(req, res, next) {

  var nom =req.query.nom;

  Offre.remove({'offreNom' :nom},function (err) {  
   if (err) throw err;
    
    res.redirect('/Event');
    });
  

});
module.exports = router;