const jwt = require('jsonwebtoken');
require('dotenv').config()

const jsonwt = class {
    static CreerToken = (into , temps) => {
        let dataUser = {into}
console.log('into',dataUser);
        const token = jwt.sign(dataUser, process.env.SECRET_JWT, { expiresIn: temps });
        console.log(token);
        return token; 

    }

    static VerifierToken = (token) => {
        return new Promise((resolve, reject) => {
         jwt.verify(token, process.env.SECRET_JWT, (error, decodedToken) => {
                if (error) {
                    console.log('Token non valide',error);
                    reject({"erreur":error})
                } else {
                    console.log(decodedToken)
                    resolve({"success":decodedToken})
                }
            });

        })

    }


    
    static requireAuth=(req,res,next)=>{
        const token = req.cookies.jwt
            
        if (token) {
            jwt.verify(token, process.env.SECRET_JWT,(err,decodedToken) =>{
                if (err) {
                    console.log(err.message);
                    res.redirect('/connection')
                    
                } else {
                    console.log("decodedToken",decodedToken);
                    next()
                }
            });
        } else {
            res.redirect('/connection')
        }
        
    }


}


module.exports = jsonwt;