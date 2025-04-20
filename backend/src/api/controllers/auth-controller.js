import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {login} from '../models/user.js';

const authUser = async (req, res) => {
  try {
    const {username, password} = req.body;

    // Validate request body
    if (!username || !password) {
      return res
        .status(400)
        .json({message: 'Username and password are required'});
    }

    const result = await login(username);

    const passwordValid = bcrypt.compareSync(password, result.password);
    console.log('password is valid', passwordValid);

    if (!passwordValid) {
      res.sendStatus(401);
      return;
    }

    const userWithNoPassword = {
      user_id: result.user_id,
      name: result.name,
      username: result.username,
      email: result.email,
      role: result.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({user: userWithNoPassword, token});
  } catch (err) {
    console.log('err', err);
    res.status(500).send({message: 'Error logging in'});
  }
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

export {authUser, getMe};
