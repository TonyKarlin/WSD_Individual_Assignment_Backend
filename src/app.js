import express from 'express';
import cors from 'cors';
import api from './api/index.js';
import {notFoundHandler, errorHandler} from './middleware.js';
const app = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'https://users.metropolia.fi'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Individual Project - Student Restaurants API');
});

app.use('/api/v1', api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
