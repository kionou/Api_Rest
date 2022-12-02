const handlErrors = (err) => {
    const titre = err.message.split(" ")[0]
    if (err.code === 11000) {
        return 'Le nom existe déjà!'
    }
    let erreur = ""
    if (err.message.includes(`${titre} validation failed`)) {
        Object.values(err.errors).forEach(({ properties }) => {
            erreur = err[properties.path] = properties.type

        })
        switch (erreur) {
            case 'required':
                erreur = 'Ce champs est obligatoire!';
                break;
            case 'minlength':
                erreur = 'Ce champs doit avoir au moins ${min} caractères !';
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }

        return erreur
    }

}


module.exports = handlErrors