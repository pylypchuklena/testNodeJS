const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../server/models/user')

passport.use(
  new GoogleStrategy({
    //optoins for the google strat
    clientID: keys.google.client_id,
    clientSicret: keys.google.client_secret,
    callbackURL: '/auth/google/redirect'
  }, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    new User({
      name: profile.displayName,
      googleId: profile.id
    }).save(
      (err) => {
        if (err) { return done(err); }

        return done(null);
      }).then((newUser) => {
        console.log('new user created ', newUser)
      })

  }
  )
)
