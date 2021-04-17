const passport = require('passport');

require('./facebook.strategy')(passport);
require('./twitter.strategy')(passport);
require('./google.strategy')(passport);
require('./joinMe.strategy')(passport);
