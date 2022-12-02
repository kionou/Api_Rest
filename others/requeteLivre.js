const Livre = require("../models/Livre")
const Stock = require("../models/stock")
const Stockdata = require("./requeteStock")





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

    static LivrerAllCat=  (into)=>{
        return new Promise(async (next)=>{
            Livre.find({ genre_id: into})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }
   
    static InsertionLivre=  (into ,image)=>{
        console.log('immmm',image);
        const {titre,auteur,langue,annee_edition,lieu_edition,genre_id,description ,nombre_exemplaire} = into
        return new Promise(async (next)=>{
            Livre.create({titre,auteur,langue,annee_edition,lieu_edition,genre_id,image,description})
            .then(resultat=>{
                console.log('ss',resultat);
                let id_livre = resultat._id
                Stock.create({nombre_exemplaire,id_livre})
                .then(result =>{
                    console.log("resultat",resultat);
                   next({success: {livre:resultat , stock:result }})
        
                })
                .catch(error  =>{
                    console.log('errrostok',error);
                })

            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static IdbyLivre=  (into)=>{
        return new Promise(async (next)=>{
          await  Livre.findById({_id:into})
            .then(resultat=>{
                console.log('ss',resultat);
               Stockdata.IdbyStock(resultat._id)
               .then(result=>{
                 next({success:{livre:resultat , stock:result}})
            })
            .catch(error=>{
                console.log("error",error);
               
           })
             
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static LivreDelete=  (into)=>{
       
        return new Promise(async (next)=>{
            Livre.findOneAndDelete({_id:into})
            .then(resultat=>{
                Stockdata.StockDelete(into)
                .then(result=>{
                  next({success:{livre:resultat , stock:result}})
             })
             .catch(error=>{
                 console.log("error",error);
                
            })
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static LivreUpdate=  (into , id)=>{
        console.log('into',into);
        console.log('into',id);

        const {titre,auteur,langue,annee_edition,lieu_edition,genre_id,description } = into
        return new Promise(async (next)=>{
            Livre.findByIdAndUpdate(id,{titre,auteur,langue,annee_edition,lieu_edition,genre_id,description})
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