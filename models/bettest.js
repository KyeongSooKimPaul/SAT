var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    userid : {type:String, required:true},
    betamount: {type: Object, required:true},
    createdat : {type:String, required:true},
    bettitle : {type:String, required:true},
    shareout : {type:String, required:true},
    date : {type:Number, required:true},
    order : {type:Number, required:true}
  
});

module.exports = mongoose.model('Bettest', schema);
