
var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');


var Product = require('../models/product');
var Order = require('../models/order');
var Bet = require('../models/bet');
var Betcart = require('../models/betcart');
var Betorder = require('../models/betorder');
var User = require('../models/user');
var Bettest = require('../models/bettest');

var moment = require('moment');


/* GET home page. */




router.get('/', function(req, res, next) {

  Product.find(function(err, docs) {
    var successMsg = req.flash('success')[0];
    res.render('shop/index', { title: 'Express', products : docs, successMsg : successMsg, noMessages : !successMsg });
  });

}); 



router.get('/betting-list', function(req, res, next){
  if (!req.session.betcart) {
    return res.render('shop/betting-list', {betcarts: null});


  }
  var betcart = new Betcart(req.session.betcart);


  res.render('shop/betting-list', {betcarts : betcart.generateArray(), totalBetQty : betcart.totalBetQty, totalBetAmount: betcart.totalBetAmount, afterBet : req.session.point - betcart.totalBetAmount});
});





router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;

    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/reducebet/:id', function(req, res, next){
  var productId = req.params.id;
  var betcart = new Betcart(req.session.betcart ? req.session.betcart : {});

  betcart.reduceByOne(productId);
  req.session.betcart = betcart;
  res.redirect('/betting-list');
});

router.get('/removebet/:id', function(req, res, next){
  var productId = req.params.id;
  var betcart = new Betcart(req.session.betcart ? req.session.betcart : {});

  betcart.removeItem(productId);
  req.session.betcart = betcart;
  res.redirect('/betting-list');
});


router.get('/checkout2', isLoggedIn, function(req, res, next){
  if (!req.session.betcart) {
    return res.redirect('/betting-list');
  }
  var betcart = new Betcart(req.session.betcart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout2', {betcarts : betcart.totalQty, errMsg : errMsg, noError: !errMsg});
});



router.post('/add-to-bet/:id', isLoggedIn, function(req, res, next) {

  var productId = req.params.id;
  var betcart = new Betcart(req.session.betcart ? req.session.betcart : {});
  var errMsg = req.flash('error')[0];

  Bet.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/user/betstart');
    }
    product.betamount = req.body.betamount;
    betcart.add(product, product.id);
    req.session.betcart = betcart;
    console.log(req.session.betcart);
    res.redirect('/user/betstart');
  });
});



router.post('/add-to-bet-test/:id', isLoggedIn, function(req, res, next) {

  var productId = req.params.id;
  //var betcart = new Betcart(req.session.betcart ? req.session.betcart : {});
  var errMsg = req.flash('error')[0];

  Bet.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/user/betstart');
    }
    product.betamount = req.body.betamount;


    var bettest = new Bettest({
      user : req.user,
      userid : req.session.email,
      betamount : req.body.betamount,
      createdat : moment().utc().format('YYYYMMDDHHmm'),
      bettitle : product.title,
      shareout : 0,
      date : product.date,
      order : product.order
      
    });

    bettest.save()

    console.log(bettest);


    res.redirect('/user/betstart');
  });
});





router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;

    res.redirect('/');
  });
});

router.post('/checkout2', isLoggedIn, function(req, res, next) {
  if (!req.session.betcart) {
    return res.redirect('/betting-list');
  }
  /*
  if (req.session.point - req.session.betcart.totalBetAmount < 0){
     var insufficientMsg =  req.flash('Insufficient', 'Insufficient Point');
     return insufficientMsg; 

  }
*/
  var betcart = new Betcart(req.session.betcart);
  var errMsg = req.flash('error')[0];




  User.findOne({ _id: req.user._id})
  .exec(function(err,result){
    if(err)throw err;
    if(result){
    result.point = req.body.remainpoint ;
    result.email;
    result.save()
    }
    else{console.log("not found")}
    })
  
    console.log('thisId variable ->' + req.session.email);

    var betorder = new Betorder({
      user : req.user,
      betcart : betcart,
      remainpoint : req.body.remainpoint ,
      userid :  req.session.email,
      createdat : moment().utc().format('YYYYMMDDHHmm')
      
    });

console.log(moment().format('YYYYMMDDHHmm'));
console.log(typeof(moment().format('YYYYMMDDHHmm')));


  /*var betorder = new Betorder({
    user : req.user,
    betcart : betcart,
    remainpoint : req.body.remainpoint ,
    userid : req.session.useremail
  });*/






    betorder.save(function(err, result) {
    req.flash('success', 'Successfully bought product!!');
    req.session.point = req.body.remainpoint;
    req.session.betcart = null;
    res.redirect('/');
  });
});



router.get('/shopping-cart', function(req, res, next){
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }

  var cart = new Cart(req.session.cart);

  res.render('shop/shopping-cart', {products:cart.generateArray(), totalPrice: cart.totalPrice});
});



router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_cu92OBAWXV7K44jokTYEgiYU"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken,
    description: "Test Charge"
  }, function(err, charge) {
      if (err){
        req.flash('error', err.message);
        return res.redirect('/checkout');
      }
      var order = new Order({
        user : req.user,
        cart : cart,
        address : req.body.address,
        name : req.body.name,
        paymentId: charge.id
      });
      order.save(function(err, result) {
        req.flash('success', 'Successfully bought product!!');
        req.session.cart = null;
        res.redirect('/');
      });

  });

});

router.get('/admin', isLoggedIn, function(req, res, next){


  Betorder.find({}, function(err, betorders) {
    if (err) {
      return res.write('Error!');
    }
    var betcart;
    betorders.forEach(function(betorder) {
        betcart = new Betcart(betorder.betcart);
        betorder.items = betcart.generateArray();
        console.log(betorder.items);

        
    });
    //console.log(betorders);
    res.render('user/bettinghistory', {betorders : betorders});
  });

});

router.get('/admin2', isLoggedIn, function(req, res, next){

  Bettest.find({order:1 }, function(err, bettests) {
    if (err) {
      return res.write('Error!');
    }


    for(var i = 0; i < bettests.length; i++){

      var dividend = 40;

      User.findOne({ email: bettests[i].userid})
      .exec(function(err,result){
        if(err)throw err;
        if(result){

        //console.log('this is result'+ result)

        
        }
        else{console.log("not found")}
        })

    }

    //console.log('this is bettests'+ bettests)


    res.render('shop/admin2', {bettests : bettests});
  });

});










/*

Bet.find({})
.sort({"order" : 1})
.exec(

  (function(err, docs) {

        var betsresult = [];

      for(var i = 0; i < docs.length; i+=3){
        betsresult.push(docs[i]);
      }

      console.log('this is betresult ->' + betsresult);
      console.log('---------------------------------');
      console.log('this is docs ->' +docs);

    res.render('shop/admin', { title: 'Express', bets : docs, betsresult : betsresult});





  })   
)
*/



module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.session.oldUrl = req.url;
  res.redirect('/user/signin');
}



