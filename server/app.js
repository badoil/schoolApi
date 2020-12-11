var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var abcdRouter = require('./routes/abcd');
// var abcRouter = require('./routes/abc');
var commonRouter = require('./routes/common')

var schoolRouter = require('./routes/school');
var studentsRouter = require('./routes/student');
var commentRouter = require('./routes/comment');
var swaggerUi = require('swagger-ui-express')
var swaggerJSDoc = require('swagger-jsdoc')
var cors = require('cors');
var app = express();



const swaggerDefinition = {
  info: {
    title: 'School Server API',
    version: '1.0.0',
    description: 'API description',
},
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./schemas/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/abcd', abcdRouter);
// app.use('/abc', abcRouter);
app.use('/school', schoolRouter);
app.use('/student',studentsRouter)
app.use('/common',commonRouter)
app.use('/comment',commentRouter)

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
