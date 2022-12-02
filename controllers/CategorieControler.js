const { request,response } = require("express");
const handlErrors = require("../middleware/validator");
const Categoriedata = require("../others/requeteCategorie");






const dataCategorie = class{
    
    static AllCategorie = async (req =request,res =response)=>{

        const categorie = await Categoriedata.CategorieAll()
        if (categorie.success) {
       
            res.status(201).send(categorie.success)
        } else {
            res.status(400).json({"Une erreur est surveni":categorie.erreur})
        }

    }

    static PostCategorie = async (req =request,res =response)=>{
        console.log('boby',req.body );

    const categorie = await Categoriedata.InsertionCategorie(req.body)
    if (categorie.success) {
   
        res.status(201).send(categorie.success)
    } else {
        console.log('ededede',categorie.erreur);
      const error =  handlErrors(categorie.erreur)
        res.status(400).json({"alert":error})
    }

}

static CategoriebyId = async (req =request,res =response)=>{

const categorie = await Categoriedata.IdbyCategorie(req.params.id)
if (categorie.success) {

    res.status(201).send(categorie.success)
} else {
    console.log('ededede',categorie.erreur);
  const error =  handlErrors(categorie.erreur)
    res.status(400).json({"alert":error})
}

}

static CategorieUpdate = async (req =request,res =response)=>{
    console.log('ffqf',req.body , req.params.id);

    const categorie = await Categoriedata.CategorieUpdate(req.body,req.params.id)
    if (categorie.success) {
    
        res.status(201).send(categorie.success)
    } else {
        console.log('ededede',categorie.erreur);
      const error =  handlErrors(categorie.erreur)
        res.status(400).json({"alert":error})
    }
    
    }

    static DeleteCategorie = async (req =request,res =response)=>{
        console.log('ffqf', req.params.id);
    
        const categorie = await Categoriedata.CategorieDelete(req.params.id)
        if (categorie.success) {
        
            res.status(201).send(categorie.success)
        } else {
            console.log('ededede',categorie.erreur);
          const error =  handlErrors(categorie.erreur)
            res.status(400).json({"alert":error})
        }
        
        }

   
}

 


module.exports = dataCategorie