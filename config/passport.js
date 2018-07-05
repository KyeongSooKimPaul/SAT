var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//passport.js는 passport 하위 메써드들을 정의하기 위한 파일.
//라우터에서 passport 하위 메써드들 사용 시, app.js 에서 require('./config/passport');
//명령을 하면 다른 폴더들에서도 passport 하위 메써드 접근 가능.


//passport는 session 관리를 위한 모듈. 
//serializeUser은 유저의 id를 세션에 저장하기 위한 함수.(user의 id와 user 필드 (이메일) 값을 매칭)
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//deserializeUser은 유저가 입력한 id가 세션에 저장되어 있는지 확인하는 함수.
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

    passReqToCallback : true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email' : email}, function(err, user) {
        if (err){
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.point = 100;

            newUser.save(function(err, result) {
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            });
    });


}));

//usernameField에 eamil을 입력을 하였기 때문에 user 파라미터로 db 내 email 값에 접근 가능.

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email' : email}, function(err, user) {
        if (err){
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }      
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Wrong password.'});
        }

        req.session.email = null;
        req.session.point = null;
        req.session.email = user.email;
        req.session.point = user.point;

        return done(null, user);
    });
}));