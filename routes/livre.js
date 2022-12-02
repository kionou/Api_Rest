var express = require('express');
const dataLivre = require('../controllers/LivreControler');
const upload = require('../middleware/multer');
var router = express.Router();


router.get('/',dataLivre.AllLivre );
router.post('/',upload.single('image'),dataLivre.PostLivre );
router.get('/:id',dataLivre.GetLivrebyId );
router.delete('/:id',dataLivre.DeleteLivre );
router.put('/:id',dataLivre.UpdateLivre );




module.exports = router;