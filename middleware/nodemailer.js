const nodemailer = require("nodemailer");
require('dotenv').config()





exports.mailer = (email,token)=>{
  return new Promise((resolve,reject)=>{
  let transporter = nodemailer.createTransport({
      service:'gmail', 
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD 
      },
    });
  let lien =`http://localhost:3000/users/token/${token}`
  let mailOptions = {
      from: process.env.EMAIL, 
      to: email, 
      subject: "Hello ✔", 
      text: "Hello world?", 
      html: `<p>Hello world,bonjour Mr ${email},veillez cliquer sur ce lien suivant:  </p> 
                     <a  href="${lien}">confirmer votre email</a> 
                        pour finaliser votre inscription.`  
    };

  transporter.sendMail(mailOptions, (error, info)=>{
   if (error) {
    console.log(error);
    reject(error);

   } else {
    console.log('success' , info.response);
    resolve(info.response);
   }
}); 
})
}

