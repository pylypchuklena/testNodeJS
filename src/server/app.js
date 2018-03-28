const express= require('express');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(express.static('./public'));

app.get('/', function(req,res){
    res.render('index');
})


app.listen(3000, function(){
    console.log('listening to port 3000')
})