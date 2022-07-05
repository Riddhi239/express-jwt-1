const express = require('express');
const User = require('./model');

const passport= require('passport');
const localStrategy = require('passport-local');


const router=express.Router();



router.post('/register',(req,res,next)=>{
    var user=new User();
    user.email=req.body.email,
    user.password=req.body.password,
    
    user.save((err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log("error in posting data"+JSON.stringify(err,undefined,2));
        }
    })
    
});

router.post('/authenticate',(req,res)=>{
    passport.use(new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        User.findOne({email:username},
            (err,user)=>{
                if(err){
                    return done(err);
                }
                //unknown user
                else if(!user){
                    return done(null,false,{message:'Email is not registered.'});
                }
                //wrong password
                else if(!user.verifyPassword(password)){
                    return done(null,false,{message:'wrong password'})
                }
                //success authentication
                else{
                    return done(null,user,{message:'success authentication'});
                    
                }
            })
    }))
})

module.exports=router;