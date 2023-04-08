const mongoose=require('mongoose')
const {Schema}= mongoose;
const bcrypt=require('bcryptjs')
// const jwt= require('jsonwebtoken')
const UserSchema = new Schema({
    Fullname:{
        type: String,
        required: true,
        
    },

    email:{
        type:String,
        required: true,
        unique: true
    },

    phonenumber:{
        type: Number,
        required: true,
        unique: true
    
    },
    
    password:{
        type: String,
        required: true,
        
    },
 
    date:{
        type: Date,
        default: Date.now
    }

});


// //Password Hashing
// UserSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password= await bcrypt.hash(this.password,10)
//         this.cpassword= await bcrypt.hash(this.cpassword,10)

//     }
//     next();
// })

const User = mongoose.model('user',UserSchema);
User.createIndexes();


module.exports= User;
