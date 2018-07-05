var createError = require('http-errors');
var express = require('express');
var http = require('http')

var cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);



var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var socket = require('./socket/socket');



var app = express();
app.io = require('socket.io')();
socket(app.io);

mongoose.connect('mongodb://localhost:27017/shopping');
require('./config/passport');

// view engine setup

app.engine('.hbs', expressHbs
({defaultLayout: 'layout', 
extname: '.hbs',
helpers: {
  section: function(name, options) { 
    if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this); 
      return null;
    }
}    

}
));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized:false,
  store: new MongoStore({ mongooseConnection:mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));

//cors 초기화


app.use(cors());





app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});






/*
//웹 서버 실행
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('웹 서버 실행 : ' + app.get('port') );
});

//socket.io 서버 시작
var io =  socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');

io.sockets.on('connection', function(socket){
  console.log('connection info ->' + socket.request.connection._peername);

  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;
});

*/












//local.login은 passport에서 사용하는 local 스트레티지 사용 시 passport 하위에 local 하위에 login 메써드를 등록한다는 의미.

//res.locals, res.render(view, [locals], callback) : res.locals는 뷰를 렌더링하는 
//기본 콘텍스트를 포함하는 객체다. res.render는 jade와 같은 템플릿 엔진을 사용하여 
//뷰를 렌더링한다
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', userRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
