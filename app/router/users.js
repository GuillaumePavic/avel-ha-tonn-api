const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getUser);
router.post('/marker', authMiddleware, userController.saveMarker);
router.delete('/', authMiddleware, userController.deleteUser);

module.exports = router;