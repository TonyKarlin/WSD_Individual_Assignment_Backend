import app from './app.js';

const hostname = '127.0.0.1';
const port = 3000;

app.get('/api/v1/users', (req, res) => {
  res.json({message: 'Hello from the backend!'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
