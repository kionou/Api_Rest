const { request,response } = require("express");
const Livredata = require("../others/requeteLivre");




const dataLivre = class{
    
    static AllLivre = async (req =request,res =response)=>{
            console.log(req.body);

        const livre = await Livredata.LivrerAll()
        if (livre.success) {
       
            res.status(201).send(livre.success)
        } else {
            res.status(400).json({"Une erreur est surveni":livre.erreur})
        }

    }

    static PostLivre = async (req =request,res =response)=>{
        console.log(req.body);

    const livre = await Livredata.InsertionLivre(req.body)
    if (livre.success) {
   
        res.status(201).send(livre.success)
    } else {
        res.status(400).json({"Une erreur est surveni":livre.erreur})
    }

}

   
}

 


module.exports = dataLivre