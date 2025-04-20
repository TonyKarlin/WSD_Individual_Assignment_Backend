'use strict';
import {getMe, authUser} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/middleware.js';
import express from 'express';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
