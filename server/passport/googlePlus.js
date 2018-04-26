const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../../config/keys');
const User = require('../../server/models/user')

passport.serializeUser((user, done)=>{
  done(null, user.id)
})
passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null, user)
  })
  
})

module.exports =  new GoogleStrategy({
    //optoins for the google strat
    clientID: keys.google.client_id,
    clientSecret: keys.google.client_secreT,
    callbackURL: '/auth/google/redirect'
  }, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile.displayName);
    User.findOne({googleId: profile.id}).then((currentUser)=>{
      if(currentUser){
        console.log('user is: ', currentUser)
        done(null, currentUser)
      }
      else{
        new User({
          name: profile.displayName,
          googleId: profile.id
        })
        .save().then((newUser) => {
            console.log('new user created ', newUser);
            done(null,newUser)
          })
      }
    })
   

  })
