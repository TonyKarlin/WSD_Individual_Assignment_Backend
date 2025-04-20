'use strict';
import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/users-controller.js';
import {authenticateToken} from '../../middleware.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
