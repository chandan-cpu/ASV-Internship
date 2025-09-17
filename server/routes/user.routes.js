const express=require('express');
const { registerUser, verifyEmail,login } = require('../components/user-cont');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/register',registerUser);
route.get('/verify/:token',verifyEmail);
route.post('/login',login);

module.exports=route;