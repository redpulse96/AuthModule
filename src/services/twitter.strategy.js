const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = (passport) => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Facebook profile is serialized
  // and deserialized.
  passport.serializeUser(function (user, cb) {
    console.log(user);
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    console.log(user);
    cb(null, obj);
  });

  // Configure the Twitter strategy for use by Passport.
  //
  // OAuth 1.0-based strategies require a `verify` function which receives the
  // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
  // user's behalf, along with the user's profile.  The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env['TWITTER_CONSUMER_KEY'],
        consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
        callbackURL: 'http://127.0.0.1:8080/oauth/callback',
        passReqToCallback: true,
        includeEntities: true,
        includeEmail: true,
      },
      (token, tokenSecret, profile, cb) => {
        console.log('asdasdas');
        console.log(profile);
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
      },
    ),
  );
};
