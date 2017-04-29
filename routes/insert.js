var express = require('express');
var router = express.Router();
var Offre = require('../models/offre.js');

router.get('/', function(req, res, next) {
    res.render('insert', {
        "title" : "Ajout offres"
    });
});

/* Ajout d'un utilisateur, pas GET mais POST cette fois et sur l'URL de la méthode pour le routage */
router.post('/addoffre', function(req, res) {
   // Positionnement de la variable base de donnée

   // Récupération des valeurs du formulaire
   var Nom = req.body.Nom;
   var Type = req.body.Type;
   var Nbjours = req.body.Nbjours;
   var Role = req.body.Role;
   var NbFigurant = req.body.NbFigurant;
   var Date = req.body.Date;


  
  
  var newOffre = new Offre({
        "offreNom" : Nom,
        "offreType" : Type,
        "offreNbjours" : Nbjours,
        "offreRole" : Role,
        "offreNbFigurant" : NbFigurant,
        "offreDate" : Date
    });
      
         
     newOffre.save( function (err, doc)  {
      if (err) {
         // Retour d'une erreur
         res.send("Pas glop !");
      }
      else {
         // Redirection vers la liste, donc vers une vue existante
         res.redirect("/offres");
      }
   });
});


module.exports = router;
