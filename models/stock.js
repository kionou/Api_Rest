const  mongoose  = require("mongoose");


const stockSchema = new mongoose.Schema({
    nombre_exemplaire :{
        type:String,
        required: true ,
    },
    id_livre:{
    type:String
    
    }
},
{ timestamps: true }
)


const Stock = mongoose.model('Stock',stockSchema)
module.exports = Stock