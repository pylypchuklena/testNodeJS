const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const passport = require('passport');
const config = require('./config');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

//connect to db and load models
require('./server/models').connect(config.dbUri);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/server'));



// tell the app to look for static files in these directories
app.use(express.static('./server/public'));
app.use(express.static('./client/dist/'));
app.use(express.static('./node_modules/font-awesome/'));

//parse Http body msg JSON
app.use(bodyParser.json());


// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys:[keys.session.cookieKey]
// }))
// pass the passport middleware
app.use(passport.initialize());

// app.use(passport.session());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
// const localGoogleStrategy = require('./server/passport/googlePlus');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
// passport.use('google', localGoogleStrategy);




//pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleweare/auth-check');
app.use('/api', authCheckMiddleware);


//routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

app.get('*', function(req,res){
    res.render('index');
})


app.listen(3000, function(){
    console.log('listening to port 3000')
})