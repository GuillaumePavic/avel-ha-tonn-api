const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post('/', authController.logIn);
router.get('/confirmEmail/:token', authController.confirmEmail);
router.post('/resetPwdEmail', authController.sendMailToResetPwd);
router.post('/resetPwd', authController.resetPassword);

module.exports = router;