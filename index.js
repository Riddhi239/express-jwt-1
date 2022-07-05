const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwtDB');
const app=express();

app.use(bodyParser.json());

app.use('/user',require('./controller'));

app.listen(9000,()=>console.log("server running on port 9000.."));