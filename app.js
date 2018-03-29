const express= require('express');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/server'));

app.use(express.static('./server/public'));
app.use(express.static('./client/dist/'))

app.get('*', function(req,res){
    res.render('index');
})


app.listen(3000, function(){
    console.log('listening to port 3000')
})