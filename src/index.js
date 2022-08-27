// Imports
import express from 'express';
import cors from 'cors';

// Global Variables
const users = [];
const tweets = [
  {
    username: 'bobesponja',
    tweet: 'tweet 1',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 2',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 3',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 4',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 5',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 6',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 7',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 8',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 9',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 10',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 11',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 12',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 13',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 14',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 15',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 16',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 17',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 18',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 19',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 20',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 21',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 22',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 23',
  },
  {
    username: 'bobesponja',
    tweet: 'tweet 24',
  },
];

// Create server
const app = express();
app.use(express.json());
app.use(cors());

//------------------------
// Auxiliary functions
//-----------------------

// Auxiliary function to get tweets with avatar from input variable tweetsList
function getTweetsWithAvatar(tweetsList) {
  return tweetsList.map((tweet) => {
    const avatar = users.find((user) => {
      return user.username === tweet.username;
    })?.avatar;
    return { ...tweet, avatar: avatar };
  });
}

// Auxiliary function to get up to 10 tweets from requested page
// tweets are returned from most recent to oldest
function getPageTweets(tweetsList, page) {
  const N = tweetsList.length;
  if (page - 1 > N / 10) {
    return [];
  }
  const limSup = N - 10 * (page - 1);
  const limInf = Math.max(0, limSup - 10);
  return tweetsList.slice(limInf, limSup).reverse();
}

//------------------------
// Server functions
//------------------------

// POST /sign-up
//------------------------
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
//------------------------
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
//------------------------
app.get('/tweets', (req, res) => {
  // Get page index
  const pageNumber = Number(req.query.page);

  if (pageNumber) {
    // Verify if page index is valid
    if (pageNumber < 1 || pageNumber % 1 !== 0) {
      res.status(400).send({ error: 'Informe uma página válida!' });
      return;
    }
    // Get corresponding tweets from requested page
    const pageTweets = getPageTweets(tweets, pageNumber);
    const pageTweetsWithAvatar = getTweetsWithAvatar(pageTweets);
    res.status(200).send(pageTweetsWithAvatar);
    return;
  }

  // If no query string was passed return the last 10 tweets by default
  const pageTweets = getPageTweets(tweets, 1);
  const pageTweetsWithAvatar = getTweetsWithAvatar(pageTweets);

  res.status(200).send(pageTweetsWithAvatar);
});

// GET /tweets/USERNAME
//------------------------
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
