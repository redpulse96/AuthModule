const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        req.profile = profile;
        return cb(null, profile);
      },
    ),
  );
};
