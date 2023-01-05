const { request, response } = require("express");
const jsonwt = require("../middleware/jsonwebtoken");
const { mailer } = require("../middleware/nodemailer");
const handlErrors = require("../middleware/validator");
const Userdata = require("../others/requeteUsers");
const bcrypt = require('bcrypt')


const UserControler = class {

    static UserSign = async (req = request, res = response) => {
        console.log('reqbody', req.body);
        const user = await Userdata.UserOne(req.body.email)
        if (user.alert) {
            const token = jsonwt.CreerToken(req.body, '1h')
            mailer(req.body.email, token)
                .then(resultat => {
                    res.status(201).json({ 'message': 'Verifiez votre boite Email pour finaliser votre inscription' })

                }).catch(err => {
                    console.log("eee", err);
                    res.status(400).json({ "error": "message non envoyer" })

                })
        } else if (user.success) {
            res.status(201).json({ 'alert': 'L\'adresse Email existe deja , veuillez-vous connectés ! ' })
        }

    }

    static Token = async (req = request, res = response) => {
        const token = await jsonwt.VerifierToken(req.params.id)
        if (token.success) {
            const user = await Userdata.InsertionUser(token.success)
            if (user.success) {
                res.status(201).json({ "message": 'compte creer avec success' })
            } else {
                console.log('ededede', user.erreur);
                const error = handlErrors(user.erreur)
                res.status(400).json({ "alert": error })
            }

        } else {
            res.status(400).json({ "alert": "Session expirer veuillez recommener" })
        }

    }
    static Login = async (req = request, res = response) => {

        const user = await Userdata.UserOne(req.body.email)
        if (user.success) {
            const auth = await bcrypt.compare(req.body.password, user.success.password)
            if (auth) {
                const token = jsonwt.CreerToken( user.success._id ,'30d')
                res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
                res.status(201).json({ "connecter": token })

            } else {
                res.status(201).json({ "alert": "Mot de pase incorrect" })

            }
        } else if (user.alert) {
            res.status(201).json({ "alert": "Email ou le mot de passe est incoorect !" })

        } else {

            console.log('ededede', user.erreur);
            const error = handlErrors(user.erreur)
            res.status(400).json({ "alert": error })
        }


    }

    static GetUserAll = async (req = request, res = response) => {
        const user = await Userdata.UserAll()
        if (user.success) {

            res.status(201).send({ "Liste des users": user.success })
        } else {
            console.log('ededede', user.erreur);
            const error = handlErrors(user.erreur)
            res.status(400).json({ "alert": error })
        }

    }

    static GetUserbyId = async (req = request, res = response) => {

        const cookies = req.cookies.jwt
        console.log('cookies',req.cookies.jwt);
        if (cookies) {
        const token = await jsonwt.VerifierToken(cookies)

              console.log('tokennn',token );
        if (token.success) {
            const user = await Userdata.UserbyId(token.success.into)
            if (user.success) {

                res.status(201).send({ "resultat": user.success })
            } else {
                console.log('errrreurrrr', user.erreur);
                const error = handlErrors(user.erreur)
                res.status(400).json({ "error": error })
            }

        } else {
            res.status(400).json({ "alert": "Session expirer veuillez recommener" })
        }
            
        } else {
                res.status(400).json({ "alert": "Le token est null " })
            
        }

        // console.log('req.params', req.params.id);
        // console.log('req.params?cokiess', req.cookies.jwt);

        // const token = await jsonwt.VerifierToken(req.cookies.jwt)

        // console.log('tokennn',token );
        // if (token.success) {
        //     const user = await Userdata.UserbyId(token.success)
        //     if (user.success) {

        //         res.status(201).send({ "resultat": user.success })
        //     } else {
        //         console.log('errrreurrrr', user.erreur);
        //         const error = handlErrors(user.erreur)
        //         res.status(400).json({ "alert": error })
        //     }

        // } else {
        //     res.status(400).json({ "alert": "Session expirer veuillez recommener" })
        // }


    }

    static DeleteUser = async (req = request, res = response) => {


        const user = await Userdata.UserDelete(req.params.id)
        if (user.success) {

            res.status(201).send({ "message": "user delete avec success" })
        } else {
            console.log('ededede', user.erreur);
            const error = handlErrors(user.erreur)
            res.status(400).json({ "alert": error })
        }

    }

    static UpdateUser = async (req = request, res = response) => {


        const user = await Userdata.UserUpdate(req.body, req.params.id)
        if (user.success) {
            res.status(201).send({ "message": "user update avec success" })
        } else {
            console.log('ededede', user.erreur);
            const error = handlErrors(user.erreur)
            res.status(400).json({ "alert": error })
        }

    }

    static Logout = async (req = request, res = response) => {
        res.cookie('jwt', '', { maxAge: 1 })
        res.status(201).send({ "message": "user deconnecter avec success" })




    }





}




module.exports = UserControler