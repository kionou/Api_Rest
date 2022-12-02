const Genre = require("../models/genre")
const Livredata = require("./requeteLivre")

const Categoriedata = class {

    static CategorieAll = () => {
        return new Promise(async (next) => {
            Genre.find({})
                .then(resultat => {
                    console.log('ss', resultat);
                    next({ success: resultat })
                }).catch(err => {
                    console.log("eee", err);
                    next({ erreur: err })
                })
        })

    }

    static InsertionCategorie = (into) => {
        const { nom } = into
        return new Promise(async (next) => {
            Genre.create({ nom })
                .then(resultat => {
                    console.log('ss', resultat);
                    next({ success: resultat })
                }).catch(err => {
                    console.log("eee", err);
                    next({ erreur: err })
                })
        })

    }

    static IdbyCategorie = (into) => {
        return new Promise(async (next) => {
            Genre.findById({ _id: into })
                .then(resultat => {
                    console.log('ss', resultat);
                    next({ success: resultat })
                }).catch(err => {
                    console.log("eee", err);
                    next({ erreur: err })
                })
        })

    }

    static CategorieUpdate = (into, id) => {
        const { nom } = into
        return new Promise(async (next) => {
            Genre.findByIdAndUpdate(id, { nom })
                .then(resultat => {
                    console.log('ss', resultat);
                    next({ success: resultat })
                }).catch(err => {
                    console.log("eee", err);
                    next({ erreur: err })
                })
        })

    }

    static CategorieDelete = (into) => {

        return new Promise(async (next) => {
            Genre.findOneAndDelete({ _id: into })
                .then(resultat => {
                    console.log('ss', resultat);
                    Livredata.LivrerAllCat(into)
                        .then(result => {
                            result.success.forEach(element => {
                                Livredata.LivreDelete(element._id)
                                    .then(result => {
                                        next({ success: result })
                                    })
                                    .catch(error => {
                                        console.log("error", error);

                                    })

                            });
                        })
                        .catch(error => {
                            console.log("error", error);

                        })
                }).catch(err => {
                    console.log("eee", err);
                    next({ erreur: err })
                })
        })

    }
}




module.exports = Categoriedata