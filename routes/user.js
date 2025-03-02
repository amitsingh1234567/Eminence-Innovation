const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {verifyToken} = require('../middleware/index');

router.post('/signup', userController.Signup);

router.post('/login', userController.Login);

router.get('/role_base_user', verifyToken, userController.users);

router.get('/get_all_user', userController.getAllUser);

router.post('/assign_user_role', userController.assignUserRole);

module.exports = router;