var mongoose = require('mongoose');

// Create schema
var OffreSchema  = new mongoose.Schema({
  offreNom : String,
  offreType : String,
  offreNbjours : Number,
  offreRole : String, 
  offreNbFigurant : Number,
  offreListe_des_figurants_retenus : [],
  offreDate : String
});

module.exports = mongoose.model('Offre',OffreSchema);
