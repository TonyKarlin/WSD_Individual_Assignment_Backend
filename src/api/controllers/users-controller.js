'use strict';
import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user.js';
import {validationResult} from 'express-validator';

import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res, next) => {
  console.log('PUT /users/:id endpoint hit');
  try {
    const {currentPassword, newPassword, username, ...otherFields} = req.body;

    // If currentPassword and newPassword are provided, validate and update the password
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        const error = new Error('Missing currentPassword or newPassword');
        error.status = 400;
        return next(error);
      }

      const user = await findUserById(req.params.id);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        const error = new Error('Invalid current password');
        error.status = 401;
        return next(error);
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      otherFields.password = hashedPassword; // Add hashed password to the update fields
    }

    // Include username in the update fields if provided
    if (username) {
      otherFields.username = username;
    }

    // Update the user in the database
    const result = await modifyUser(otherFields, req.params.id);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({message: 'Error updating user'});
    }
  } catch (error) {
    console.error('Error in putUser:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  if (result.message) {
    res.status(200);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
