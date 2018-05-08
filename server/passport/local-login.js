const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
},
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim()
    };

    //find user by email address
    return User.findOne({
      email: userData.email
    }, (err, user) => {

      if (err) { return done(err) }

      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) { return done(err); }
        const payload = {
          sub: user._id
        }
        //create a token string
        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
          //there create respons form user for view(client)
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
          role: user.role
        }
        return done(null, token, data);
      })
    });
})

