const  mongoose  = require("mongoose");


const genreSchema = new mongoose.Schema({
    nom:{
        type:String,
        required: true ,
        unique:true,
        minLength:(3)

    }
},
{ timestamps: true }
)


const Genre = mongoose.model('Categories',genreSchema)
module.exports = Genre