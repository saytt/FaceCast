var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Création du schéma pour les postulations
var postulationSchema = new mongoose.Schema({
  offre : {type: Schema.Types.ObjectId, ref: 'Offre'},
  candidat :{type: Schema.Types.String, ref: 'Figurant'},
  statut : String,
  date : Date
});

module.exports = mongoose.model('Postulation',postulationSchema);
