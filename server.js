const express = require('express');
const app = express();
const port = 8000;



// use express router
app.use('/', require('./routes/index'));












app.listen(port,function(error){
    if(error){
            console.log(`error in eunning server ${error}`);
            return;
        }
        console.log(`express server is running ${port}`);
});