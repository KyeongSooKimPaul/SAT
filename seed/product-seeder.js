var Product = require('../models/product');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
mongoose.connect('mongodb://localhost:27017/shopping');


var products = [
    new Product({
        imagePath : 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title : 'Gothic Video Game',
        description : 'insanely Great~~!!!!',
        price : 10
    }),
    new Product({
        imagePath : 'http://www.thefalse9.com/wp-content/uploads/2018/05/fifa.jpg',
        title : 'You can be a rich',
        description : 'let us make money here!!',
        price : 20
    }),
    new Product({
        imagePath : 'http://kstatic.inven.co.kr/upload/2017/11/17/bbs/i16503827477.jpg',
        title : 'got money',
        description : 'Fuck you!!!!',
        price : 15
    }),
    new Product({
        imagePath : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfeBwS-MxnnB0JMhfPGcsDk5V4-_nw_ycvg7_H_luhDbaE03N_QQ',
        title : 'We can be like him',
        description : 'hehehehehe',
        price : 12
    }),
    new Product({
        imagePath : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKiE_TnMnHXA46IHnndLiSY-WzI93-LDeiY3Bh5sNXpDKTn7M8eQ',
        title : 'idiot?',
        description : 'shashasha',
        price : 13
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result){
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
