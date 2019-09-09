const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    
  FirstName: String,
  LastName: String,
  RishabhId: String,
    responce: Array, 
  });
      

const User = module.exports = mongoose.model('users',userSchema);
