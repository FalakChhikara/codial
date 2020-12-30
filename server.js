const express = require('express');
const app = express();
const port = 8000;
















app.listen(port,function(error){
    if(error){
            console.log(`error in eunning server ${error}`);
            return;
        }
        console.log(`express server is running ${port}`);
});