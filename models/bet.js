var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    matchnumber : {type: String, required: true},
    betpic : {type: String, required: true}, //0 - win, 1-lose, 2-draw
    order : {type: Number, required: true},
    title : {type: String, required: true},
    date : {type: Number, required: true},
    point : {type: Number, required: true},
    betamount : {type: Number, required: true}
});

module.exports = mongoose.model('Bet', schema);

