var express = require('express');
var router = express.Router();

var Postulation = require("../models/postulation.js");
var Offre = require("../models/offre.js");
var Figurant = require("../models/figurant.js");

/* Liste des postulation */
router.get('/', function(req, res, next) {   
   Postulation.find({},{},function(e,docs){
      res.render('postulation', {
         "title" : "Liste des candidatures",
         "postulantlist" : docs
      });
   });
});

router.get('/postulant', function(req, res, next) {

  var id =req.query.id;

  Postulation.find({'offre' :id},function (err, docs) {  
   if (err) throw err;
    
    res.render('postulation',
               {
      'titre': "Postulant",
      'postulantlist' : docs}
    );
    });
});

router.get('/addPostul/:idOffre/:email', function(req, res, next) {

  var email = req.params.email;
  var idOffre = req.params.idOffre;
  
  Figurant.findOne({ "figEmail" : email },{},function(e,figurantsDocs){
    
    if(!figurantsDocs){
      res.send(" Email : "+email);
    }
    else{
     var postulation = new Postulation({
         candidat : email,
         offre : idOffre,
         statut : "enAttente"
     });
      
      //res.send('ok');
      postulation.save(function(err){
        if(err){
          console.log("err");
          res.send(" Effffl : "+email);  
        }
        else{
          console.log('ok');
          res.send("Ok");
          
        }
      });
            
    }
  });
});



router.post('/update/:id',function(req, res, next) {
    //Récupère l'id en paramètre
    id = req.params.id;
    //res.send(id);
    //Récupère valeur du formulaire
    etat = req.body.etat;
    
    //Recherche la postulation avec l'id et la modifie son état
    Postulation.findOneAndUpdate({"_id": id},{ $set:{ "statut": etat} }, function(e,docs){
        if(e){
            res.status(500).send(e);  
        }
        else{       
            // Redirection vers la liste
            res.redirect("/offres");
        }
    });
});


/*router.post('/update', function(req, res, next) {

    docs.statut = req.body.statut;
  postulation.save(function(err){
        if(err){
          console.log("err");
          res.send("erreur"); 
        }
        else{
          console.log('ok');
          res.redirect("offre");
        }
 
  
  });
});*/

module.exports = router;