const express=require('express');
const { registerUser, verifyEmail,login,profile, logoutUser } = require('../components/user-cont');
const { isLoggedIn } = require('../middlewares/auth.middleware');

route=express.Router();

route.get('/',(req,res)=>{
    res.send('User Route is working');
});

route.post('/register',registerUser);
route.get('/verify/:token',verifyEmail);
route.post('/login',login);
route.get('/me',isLoggedIn,profile)
route.get('/logout',isLoggedIn,logoutUser)

module.exports=route;