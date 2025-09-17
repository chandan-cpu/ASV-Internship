const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['patient','doctor','admin','serviceProvider'],default:'user'},//'serviceProvider' can be a doctor, stylist, consultant etc.
specialty:{type:String} , // For doctors or service providers
     servicesOffered: [{ type: String }], // For salons, general consultants
    // ... other profile fields
    phoneNumber:{type:Number},
    verificationToken:{type:String},
    isVerified:{type:Boolean,default:false},
    tokenExpiry:{type:Date},

},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

module.exports=mongoose.model('User',userSchema);