const  mongoose  = require("mongoose");


const livreSchema = new mongoose.Schema({
    titre:{
        type:String,
        required:true

    },
    auteur:{
        type:String,
        required: true

    },
    langue:{
        type:String,
        required: true,
    },
    annee_edition:{
        type:String,
        required:[ true]

    },
    lieu_edition:{
        type:String,
        required: true

    },
    genre_id:{
        type:String,
        required: true,
    },

    image:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:[ true]
    }

},
{ timestamps: true }
)






const Livre = mongoose.model('Livre',livreSchema)
module.exports = Livre