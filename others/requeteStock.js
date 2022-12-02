const Stock = require("../models/stock")




const Stockdata = class{

    static InsertionStock=  (into)=>{
        const {nom} = into
        return new Promise(async (next)=>{
            Stock.create({nom})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static IdbyStock=  (into)=>{
        return new Promise(async (next)=>{
            Stock.findOne({ id_livre:into})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static StockUpdate=  (into , id)=>{
        console.log('qsF',into);
        const {nom} = into
        return new Promise(async (next)=>{
            Stock.findByIdAndUpdate(id,{nom})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static StockDelete=  (into)=>{
       
        return new Promise(async (next)=>{
            Stock.findOneAndDelete({id_livre:into})
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

 


module.exports = Stockdata