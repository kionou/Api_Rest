var express = require('express');
const dataLivre = require('../controllers/LivreControler');
var router = express.Router();


router.get('/',dataLivre.AllLivre );
router.post('/',dataLivre.PostLivre );

module.exports = router;