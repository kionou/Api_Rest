var express = require('express');
const UserControler = require('../controllers/AuthUser');
const { requireAuth } = require('../middleware/jsonwebtoken');
var router = express.Router();




router.post('/sign',UserControler.UserSign);
router.post('/login',UserControler.Login);
router.get('/token/:id',UserControler.Token);
router.get('/',UserControler.GetUserAll);
router.get('/:id',requireAuth,UserControler.GetUserbyId);
router.get('/logout',UserControler.Logout)
router.delete('/:id',UserControler.DeleteUser);
router.put('/:id',UserControler.UpdateUser);








module.exports = router;
