const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:'email can\'t be empty',
        unique:true
    },
    password:{
        type:String,
        required:"password can\'t be empty",
        minlength:[6,"password must be 6 characters long"]
    },
    saltSecret:{
        type:String
    }
});

//validation for email
userSchema.path('email').validate((val)=>{
    emailRegEx = /^(([^()\[\]\\.,:;\@]+([^()\[\]\\.,:;\@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(val);
},'Invalid email');

//encrypting password
userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});
//methods
userSchema.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password.toString(),this.password);
};
module.exports=mongoose.model('User',userSchema);