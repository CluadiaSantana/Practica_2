const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const axios = require('axios');
var exphbs= require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname,'views')
}));
app.set('view engine', 'handlebars');

if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}
const port = process.env.PORT;


app.use('/assets', express.static(path.join(__dirname, 'views')));

app.get('/',async function (req,res){
    res.render('index',{
        news: await news('everything')

    });
})

app.get('/:everything',async function(req,res){
    res.render('index',{
        news: await news(req.params.everything)
    });
})

async function news(search){
    return await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.KEY}`)
    .then(responsive=>{
        //console.log(responsive.data.articles)
        return responsive.data.articles
    })
}


app.listen(port,()=>{
    console.log('App is listening in port '+port)
})