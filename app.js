require('dotenv').config();

const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const routes = require('./src/routes');
// Create a new Express application.
const app = express();

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./src/services');
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use('/', routes);

app.get('/login', function (req, res) {
  res.render('login');
});

app.listen(process.env['PORT'] || 8080, () => {
  console.log('Server running');
});
