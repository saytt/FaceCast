var mongoose = require('mongoose');

// Create schema
var figurantSchema = new mongoose.Schema({
  figNom : String,
  figPrenom : String,
  figEmail : String,
  idandroid: String
});

module.exports = mongoose.model('Figurant',figurantSchema);
