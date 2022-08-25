// Imports
import express from 'express';
import cors from 'cors';

// Global Variables
const users = [];
const tweets = [];

// Create server
const app = express();
app.use(express.json());
app.use(cors());

// POST /sign-up
app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (username === '' || avatar === '') {
    res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    users.push(req.body);
    res.status(201).send('OK');
  }
});

// POST /tweets
app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  if (username === '' || tweet === '') {
    res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    tweets.push(req.body);
    res.status(201).send('OK');
  }
});

// GET /tweets
app.get('/tweets', (req, res) => {
  const lastTweets = tweets.slice(-10);

  const lastTweetsWithAvatar = lastTweets.map((tweet) => {
    const avatar = users.find((user) => {
      return user.username === tweet.username;
    })?.avatar;
    return { ...tweet, avatar: avatar };
  });

  res.send(lastTweetsWithAvatar);
});

// GET /tweets/USERNAME
app.get('/tweets/:username', (req, res) => {
  const username = req.params.username;
  const userTweets = tweets.filter((tweet) => tweet.username === username);

  const avatar = users.find((user) => {
    return user.username === username;
  })?.avatar;

  const userTweetsWithAvatar = userTweets.map((tweet) => {
    return { ...tweet, avatar: avatar };
  });

  res.send(userTweetsWithAvatar);
});

// Initialize server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
