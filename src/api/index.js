'use strict';
import express from 'express';
import authRouter from './routes/auth-routes.js';
import userRouter from './routes/users-routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
