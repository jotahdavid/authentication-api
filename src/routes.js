const { Router } = require('express');

const AuthController = require('./app/controllers/Auth.controller');
const UserController = require('./app/controllers/User.controller');

const authMiddleware = require('./middlewares/auth');

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/users/me', authMiddleware, UserController.getByToken);
router.put('/users/me', authMiddleware, UserController.updateByToken);
router.put('/users/me/password', authMiddleware, UserController.updatePasswordByToken);

router.post('/login', AuthController.login);

module.exports = router;
