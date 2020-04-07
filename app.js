const express= require('express');
const path= require('path'); 

const routes = require('./routes/index');

// setup the app
const app = express();

// middleware setup and view engine setup to pug.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// use a static route and the express.static method to serve the static files located in the public folder
app.use(express.static(path.join(__dirname,'public')));

// routes setup
app.use('/', routes);

// Treehouse Course Video https://teamtreehouse.com/library/error-handling-middleware
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('err');
    err.status = 404;
    err.message = 'Oops, page not found. Looks like that route does not exist.';
    next(err);
});

// Handle errors and print message,status and stack with a user friendly error page.
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

// turn on express server
app.listen(3000,()=>{
    console.log ('server listening on port 3000');
});

module.exports = app;
