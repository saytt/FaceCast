var express = require('express');
var router = express.Router();
var Offre = require('../models/offre');
var Postulation = require('../models/postulation');

/* Liste des offre */
router.get('/', function(req, res, next) {    
    Offre.find({},{},function(e,docs){
        res.render('offres', {
            "title" : "Liste des événements",
            "offrelist" : docs
        });
    });
});




router.get('/delete', function(req, res, next) {
  
//récupere l'id dans l'url
  var id =req.query.id;
  
//supprime les offres 
  Offre.remove({'_id' :id},function (err) {  
   if (err) throw err;
  });
  
  //supprime les postulation liée au offre suprimée 
  Postulation.remove({'offre' :id},function (err) {  
   if (err) throw err;
    
    res.redirect('/offres');
    });
  

});
module.exports = router;