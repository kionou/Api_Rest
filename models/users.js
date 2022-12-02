const  mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true,
    },
    prenom:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    numero:{
        type:Number,
        required: true,
        minLength:10
    },
    password:{
        type:String,
        required: true,
        minLength:6,
        maxLength:12
    },
    numero_carte:{
        type:String
    },
    image:{
        type:String
    }
},
{ timestamps: true }
)



userSchema.pre('save', function( next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});



const User = mongoose.model('users',userSchema)
module.exports = User