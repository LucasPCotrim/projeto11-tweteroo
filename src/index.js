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
  if (username === undefined || avatar === undefined || username === '' || avatar === '') {
    res.status(400).send({ erro: 'Todos os campos são obrigatórios!' });
    return;
  }
  users.push({ username, avatar });
  res.status(201).send({ message: 'OK' });
});

// POST /tweets
app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  if (username === undefined || tweet === undefined || username === '' || tweet === '') {
    res.status(400).send({ erro: 'Todos os campos são obrigatórios!' });
    return;
  }
  tweets.push({ username, tweet });
  res.status(201).send({ message: 'OK' });
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

  res.status(200).send(lastTweetsWithAvatar);
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

  res.status(200).send(userTweetsWithAvatar);
});

// Initialize server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
