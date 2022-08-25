import express from 'express';

const server = express();

server.get('/', (req, res) => {
  console.log('Chegou');
  res.send('Hello World');
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
