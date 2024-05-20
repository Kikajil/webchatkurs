const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id/role', userController.updateRole);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/login', userController.login);
router.post('/role', userController.addRole);

module.exports = router;
