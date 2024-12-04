require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const { twitterClient } = require("./twitterClient.js")
const { tweetSets } = require("./tweetSets.js");

const app = express();
const port = process.env.PORT || 3000;

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

function generateRandomTweetSet() {
    const tweetSet = tweetSets[Math.floor(Math.random() * tweetSets.length)];
    console.log("Generated tweet set:", tweetSet);
    return tweetSet.join(" ");
}

const tweet = async () => {
    try {
        const tweetContent = generateRandomTweet() || generateRandomTweetSet();
        console.log("Attempting to send tweet:", tweetContent);
        await twitterClient.v2.tweet(tweetContent);
        console.log("Tweet sent successfully:", tweetContent);
        return { success: true, message: "Tweet sent successfully", content: tweetContent };
    } catch (e) {
        console.error("Error sending tweet:", e);
        console.error("Error details:", JSON.stringify(e, null, 2));
        return { success: false, message: "Error sending tweet", error: e.message, details: JSON.stringify(e, null, 2) };
    }
}

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get('/', async (req, res) => {
    try {
        const result = await tweet();
        res.send(`
            <html>
                <body>
                    <h1>Twitter Bot</h1>
                    <div id="result">${result.message}</div>
                    <div id="details">${result.details || ''}</div>
                    <script>
                        console.log('Tweet content:', ${JSON.stringify(result.content)});
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).send("An unexpected error occurred");
    }
});


const domain = process.env.DOMAIN || 'localhost';
app.listen(port, () => {
    console.log(`Server running at http://${domain}:${port}`);
});
