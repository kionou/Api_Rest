const  mongoose  = require("mongoose");


const livreSchema = new mongoose.Schema({
    titre:{
        type:String,
        require:[ true]

    },
    auteur:{
        type:String,
        require: true

    },
    langue:{
        type:String,
        require: true,
    },
    annee_edition:{
        type:String,
        require:[ true]

    },
    lieu_edition:{
        type:String,
        require: true

    },
    genre:{
        type:String,
        require: true,
    },

    image:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require:[ true]
    }

},
{ timestamps: true }
)






const Livre = mongoose.model('user',livreSchema)
module.exports = Livre