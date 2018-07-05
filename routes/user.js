var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var moment = require('moment');

var Order = require('../models/order');
var Cart = require('../models/cart');
var Bet = require('../models/bet');
var Betcart = require('../models/betcart');
var Betorder = require('../models/betorder');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

var today

function Curtime(){
  return today = moment().format('MMMM Do YYYY, h:mm:ss a');
};

Curtime();

 
  

router.get('/betstart', function(req, res, next) {

  Bet.find({})
  .sort({"order" : 1})
  .exec(

    (function(err, docs) {
      var point = req.session.point;
      for (var i = 0; i < docs.length; i++){
        docs[i].point = point;
      }
      res.render('user/betstart', { title: 'Express', bets : docs, today : today});
    })   
  )
}); 

  

router.get('/chat01', function(req, res, next) {

      res.render('user/chat01');

}); 






router.get('/bettinghistory', isLoggedIn, function(req, res, next){
  Betorder.find({user: req.user}, function(err, betorders) {
    if (err) {
      return res.write('Error!');
    }
    var betcart;
    betorders.forEach(function(betorder) {
        betcart = new Betcart(betorder.betcart);
        betorder.items = betcart.generateArray();
        console.log(betorder.items);
        var i = 0 ;
        i++
        console.log(i + 'this is i');
        
    });
    //console.log(betorders);
    res.render('user/bettinghistory', {betorders : betorders});
  });
});


router.get('/profile', isLoggedIn, function(req, res, next){
    Order.find({user: req.user}, function(err, orders) {



      if (err) {
        return res.write('Error!');
      }

      var cart;
      orders.forEach(function(order) {
          cart = new Cart(order.cart);
          order.items = cart.generateArray();

          User.find({user: req.user}, function(err, users) {
         
            if (err) {
              return res.write('Error!');
            }
            var point;
            users.forEach(function(user) {
            user.point = cart.generateArray();
            console.log(user.point);
        }); 
          }); 

      });
      res.render('user/profile', {orders : orders});
    });
  });

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  req.session.point = null;
  req.session.email = null;
  req.session.cart = null;
  req.session.betcart = null;
  res.redirect('/');
});


router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  
  
  router.post('/signup', passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true
  }), function(req, res, next){
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      req.session.point = "1000";
      req.session.cart = null;
      req.session.betcart = null;
      console.log(req.session.point);
      res.redirect('/user/profile');
    }
  });
   
  router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  
  router.post('/signin', passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true
  }), function(req, res, next){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
      
      console.log(req.session.email);
      console.log(req.session.point);
      req.session.cart = null;
      req.session.betcart = null;
      res.redirect('/user/profile');
    }
  });





  /*
  router.get('/bet', function(req, res, next){
    res.render('user/bet');
  });
  */




  module.exports = router;

  //isAuthenticated는 passport 내 내장된 함수인 Authenticate가 트루 값을 반환할 경우 실행 되는 것 (나의 추측)
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  }

  function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}







