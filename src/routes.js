const { Router } = require('express');

const AuthController = require('./app/controllers/Auth.controller');
const UserController = require('./app/controllers/User.controller');

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.post('/login', AuthController.login);

module.exports = router;
