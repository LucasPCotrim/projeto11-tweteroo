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

// GET /tweets
app.get('/tweets', (req, res) => {
  const lastTweets = tweets.slice(-10);

  const lastTweetsWithAvatar = lastTweets.map((tweet) => {
    const avatar = users.find((user) => {
      return user.username === tweet.username;
    }).avatar;
    return { ...tweet, avatar: avatar };
  });

  res.send(lastTweetsWithAvatar);
});

// Initialize server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
