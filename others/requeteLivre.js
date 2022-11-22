const Livre = require("../models/Livre")




const Livredata = class{

    static LivrerAll=  ()=>{
        return new Promise(async (next)=>{
            Livre.find({})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }
   
    static InsertionLivre=  (into)=>{
        const {titre,auteur,langue,annee_edition,lieu_edition,genre,image,description} = into
        return new Promise(async (next)=>{
            Livre.create({titre,auteur,langue,annee_edition,lieu_edition,genre,image,description})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }
}

 


module.exports = Livredata