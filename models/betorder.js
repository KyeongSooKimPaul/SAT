var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    betcart: {type: Object, required:true},
    remainpoint : {type:Number, required:true},
    userid : {type:String, required:true},
    createdat : {type:String, required:true}
  
});

module.exports = mongoose.model('Betorder', schema);
