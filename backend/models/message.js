const {Schema, model} = require('../connection');
const messageSchema = new Schema({
  user: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
  //add
});
module.exports = model('message' , messageSchema);