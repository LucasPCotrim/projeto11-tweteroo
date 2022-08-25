// Imports
import express from 'express';

// Global Variables
const users = [];
const tweets = [];

// Create server
const app = express();
app.use(express.json());

// POST /sign-up
app.post('/sign-up', (req, res) => {
  users.push(req.body);
  res.send('OK');
});

// POST /tweets
app.post('/tweets', (req, res) => {
  tweets.push(req.body);
  res.send('OK');
});

// Initialize server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
