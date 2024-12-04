require("dotenv").config({ path: __dirname + "/.env" });
const twitterClient = require("./twitterClient.js");
const tweetSets = require("./tweetSets.js");
const CronJob = require("cron").CronJob;

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Twitter Bot is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const tweetComponents = {
  openings: [
    "🐸 Ribbit your way to riches with Ai Frog Coin!",
    "🧠🐸 Hop on the Ai Frog Coin train!",
    "Feeling froggy? Leap into Ai Frog Coin!",
    "Croak if you're broke! But not for long with Ai Frog Coin.",
    "Why be a prince when you can be a crypto king?",
  ],
  features: [
    "Our amphibious AI is leaping over the competition.",
    "Our neural networks are as sticky as frog tongues, catching gains left and right.",
    "Our blockchain is so green, it's practically photosynthesizing.",
    "Our lily-pad ledger technology is making waves in the crypto pond.",
    "Our amphibious algorithms are predicting profits faster than a frog's tongue catches flies.",
  ],
  calls_to_action: [
    "Don't be a tadpole in the crypto pond - evolve with $AFC!",
    "$AFC: Where AI meets amphibian ambition!",
    "Ribbit your way to the top with $AFC!",
    "Dive in to $AFC now!",
    "Kiss your financial worries goodbye with $AFC!",
  ],
  hashtags: [
    "#AiFrogCoin #Crypto #ToTheMoon 🚀",
    "#AiFrogCoin #AICrypto #HODL",
    "#AiFrogCoin #GreenCrypto #CryptoTrading",
    "#AiFrogCoin #BlockchainTech #CryptoInvestment",
    "#AiFrogCoin #CryptoRoyalty #FinancialFreedom",
  ]
};

function generateRandomTweet() {
  const opening = tweetComponents.openings[Math.floor(Math.random() * tweetComponents.openings.length)];
  const feature = tweetComponents.features[Math.floor(Math.random() * tweetComponents.features.length)];
  const callToAction = tweetComponents.calls_to_action[Math.floor(Math.random() * tweetComponents.calls_to_action.length)];
  const hashtags = tweetComponents.hashtags[Math.floor(Math.random() * tweetComponents.hashtags.length)];

  return `${opening} ${feature} ${callToAction} ${hashtags}`;
}

function generateRandomTweetSet(tweetSets) {
    const tweetSet = tweetSets[Math.floor(Math.random() * tweetSets.length)];
    console.log("Generated tweet set:", tweetSet);
    return tweetSet.join(" ");
}

const tweet = async () => {
    try {
        const tweetContent = generateRandomTweet() || generateRandomTweetSet();
        await twitterClient.v2.tweet(tweetContent);
        console.log("Tweet sent successfully:", tweetContent);
    } catch (e) {
        console.error("Error sending tweet:", e);
    }
}

tweet();