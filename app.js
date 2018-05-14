const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const passport = require('passport');
const config = require('./config');

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

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleweare/auth-check');
app.use('/api', authCheckMiddleware);


//routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

var apiRoutesSetup = require('./server/routes/api/api');
apiRoutesSetup(app);

app.get('*', function(req,res){
    res.render('index');
})

app.listen(3000, function(){
    console.log('listening to port 3000')
})