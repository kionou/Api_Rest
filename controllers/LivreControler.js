const { request,response } = require("express");
const handlErrors = require("../middleware/validator");
const Livredata = require("../others/requeteLivre");





const dataLivre = class{
    
    static AllLivre = async (req =request,res =response)=>{

        const livre = await Livredata.LivrerAll()
        if (livre.success) {
       
            res.status(201).json({"resultat":livre.success})
        } else {
            res.status(400).json({"Une erreur est surveni":livre.erreur})
        }

    }

    static PostLivre = async (req =request,res =response)=>{
        console.log('bobyjj',req.body , req.file);

    const livre = await Livredata.InsertionLivre(req.body,req.file.path)
    if (livre.success) {
        console.log('erzarete',livre.success);
   
        res.status(201).send(livre.success)
    } else {
        const error = handlErrors(livre.erreur)
        res.status(400).json({"alert":error})
    }

}

static GetLivrebyId = async (req =request,res =response)=>{
    console.log('boby22',req.params.id);

const livre = await Livredata.IdbyLivre(req.params.id)
if (livre.success) {
    console.log('erzarete',livre.success);

    res.status(201).send(livre.success)
} else {
    const error = handlErrors(livre.erreur)
    res.status(400).json({"alert":error})
}



}

static DeleteLivre = async (req =request,res =response)=>{
    console.log('boby',req.params.id);

const livre = await Livredata.LivreDelete(req.params.id)
if (livre.success) {
    console.log('erzarete',livre.success);

    res.status(201).send(livre.success)
} else {
    const error = handlErrors(livre.erreur)
    res.status(400).json({"alert":error})
}

}

static UpdateLivre = async (req =request,res =response)=>{
    console.log('boby',req.params.id);
    console.log('boby',req.body);


const livre = await Livredata.LivreUpdate(req.body, req.params.id)
if (livre.success) {
    console.log('erzarete',livre.success);

    res.status(201).send(livre.success)
} else {
    const error = handlErrors(livre.erreur)
    res.status(400).json({"alert":error})
}



}


   
}

 


module.exports = dataLivre