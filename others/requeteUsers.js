const { id } = require("../middleware/IdUnique")
const User = require("../models/users")


const Userdata = class{

    static InsertionUser=  (into)=>{
        let numero_carte = id()
        let image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        const {nom,prenom,email,numero,password} = into
        return new Promise(async (next)=>{
            User.create({nom,prenom,email,numero,password,numero_carte ,image})
            .then(resultat=>{
                console.log('sshhh',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static UserOne= async(into) =>{ 
        return new Promise(async (next)=>{  
        await User.findOne({email:into})
            .then(resultat=>{
                console.log('sseeee',resultat);
                if (resultat != null) {
                    next({success:resultat})
                    
                } else {
                    next({alert:"Email existe pas"})

                }
                
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static UserAll=  ()=>{
        return new Promise(async (next)=>{
            User.find({})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }
    static UserbyId=  (into)=>{
        return new Promise(async (next)=>{
            User.findById({_id:into})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static UserUpdate=  (into , id)=>{
        const {nom,prenom,email,numero,password} = into
        return new Promise(async (next)=>{
            User.findByIdAndUpdate(id,{nom,prenom,email,numero,password})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static UserDelete=  (into)=>{
       
        return new Promise(async (next)=>{
            User.findOneAndDelete({_id:into})
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


module.exports = Userdata