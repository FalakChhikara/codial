const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const User = require('./models/user');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

// use express router
app.use('/', require('./routes/index'));


app.use(express.static('./assets'));
// for style and link tags
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'views'));
app.set('views', './views');











app.listen(port,function(error){
    if(error){
            console.log(`error in eunning server ${error}`);
            return;
        }
        console.log(`express server is running ${port}`);
});