const mongoose = require('mongoose');

const apointmentSchema=new mongoose.Schema({
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    serviceProvider:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    serviceType:{type:String,require:true},
    startTime:{typeDate,required:true},
    endTime:{type:Date,required:true},
    status:{type:String,
        enum:['pending','confirmed',
            'cancelled','completed'],
            default:'pending'
        },
    isPaid:{type:Boolean,default:false},
    amount:{type:Number},


},{    timestamps:true
});

module.exports=mongoose.model('Appointment',apointmentSchema);
