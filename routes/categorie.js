var express = require('express');
const dataCategorie = require('../controllers/CategorieControler');


var router = express.Router();


router.get('/',dataCategorie.AllCategorie );
router.post('/',dataCategorie.PostCategorie );
router.get('/:id',dataCategorie.CategoriebyId );
router.put('/:id',dataCategorie.CategorieUpdate );
router.delete('/:id',dataCategorie.DeleteCategorie);




module.exports = router;