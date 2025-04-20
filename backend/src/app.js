import express from 'express';
import api from './api/index.js';
import {notFoundHandler, errorHandler} from './middlewares.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(notFoundHandler);
app.use(errorHandler);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Individual Project - Student Restaurants API');
});

app.use('/api/v1', api);

export default app;
