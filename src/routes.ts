import { Router } from 'express';

import AuthController from '@controllers/Auth.controller';
import UserController from '@controllers/User.controller';

import authMiddleware from '@middlewares/auth';

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/users/me', authMiddleware, UserController.getByToken);
router.put('/users/me', authMiddleware, UserController.updateByToken);
router.put('/users/me/password', authMiddleware, UserController.updatePasswordByToken);

router.post('/login', AuthController.login);

export default router;
