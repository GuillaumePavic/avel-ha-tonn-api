const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', authMiddleware, usersController.getUser);
router.post('/marker', authMiddleware, usersController.saveMarker);
router.delete('/', authMiddleware, usersController.deleteUser);

module.exports = router;