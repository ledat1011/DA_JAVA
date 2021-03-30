var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors');

//facebook login


var account = require('./routes/user/Account.controller');
var post = require('./routes/post/post.controller')
var location = require('./routes/location/location.controller');
var comment = require('./routes/comment/comment.controller')
var other = require('./routes/other/orther.controller');
var savepost = require('./routes/savepost/savepost.controller');
var thongbao = require('./routes/thongbao/thongbao.controller');
var payment = require('./routes/payment/paymentController');
var doanhthu = require('./routes/doanhthu/doanhthu.controller');
var report = require('./routes/report/report.controller');
var datcoc = require('./routes/datcoc/datcoc.controller');
//admin side
var userAdmin = require('./routes/admin/user.admin.controller');
var adminAuth = require('./routes/admin/auth.admin.controller');
var postAdmin = require('./routes/admin/post.admin.controller');
var app = express();

//test 
var test = require('./test');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use('/upload',express.static('upload'))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/account',account);
app.use('/api/location',location);
app.use('/api/post',post);
app.use('/api/comment',comment);
app.use('/api/savepost',savepost);
app.use('/api/thongbao',thongbao);
app.use('/api/payment',payment);
app.use('/api/doanhthu',doanhthu);
app.use('/api/report',report);
app.use('/api/datcoc',datcoc);
app.use('/api/other',other);

// for admin side
app.use('/api/admin/user',userAdmin);
app.use('api/admin/auth',adminAuth);
app.use('/api/admin/post',postAdmin);

//test side
app.use('/api/test',test);


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
