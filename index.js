require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const { twitterClient } = require("./twitterClient.js")
const { tweetSets } = require("./tweetSets.js");

let useRandomTweet = true;

const app = express();
const port = process.env.PORT || 3000;

const tweetComponents = {
    openings: [
      "🐸 Ribbit your way to riches with Ai Frog Coin!",
      "🧠🐸 Hop on the Ai Frog Coin train!",
      "Feeling froggy? Leap into Ai Frog Coin!",
      "Croak if you're broke! But not for long with Ai Frog Coin.",
      "Why be a prince when you can be a crypto king?",
      "🐸 Crypto is hopping, and so should you—join Ai Frog Coin!",
      "Ribbit, AI, and ROI—what more could you ask for?",
      "Hop on over to wealth with Ai Frog Coin!",
      "The future is froggy, and it’s Ai Frog Coin!",
      "Who needs golden eggs when frogs are bringing the gold?",
      "🐸 Leap where no frog has hopped before—Ai Frog Coin.",
      "From pond to penthouse with Ai Frog Coin!",
      "Not just AI—Amphibious Intelligence. That's Ai Frog Coin.",
      "Join the croak chorus: Ai Frog Coin is the way forward!",
      "It’s a frog-eat-fly world, and Ai Frog Coin wins every time.",
      "Hop past the competition with the smartest frogs in crypto!",
      "Crypto evolution starts here—Ai Frog Coin!",
      "Don’t miss the lily pad—Ai Frog Coin is taking off!",
      "Ai Frog Coin: Where leaps of faith turn into leaps of wealth.",
      "Frogs are the new bulls in crypto—Ai Frog Coin is proof!",
      "🐸 Remember, it's not a loss if you never sell—Ai Frog Coin!",
      "When one door closes, a lily pad opens: Ai Frog Coin!",
      "Why walk when you can leap to success with Ai Frog Coin?",
      "Like that frog meme, but now it’s your portfolio that’s chillin’!",
      "Feeling 'froggerish'? Hop into Ai Frog Coin!",
      "Not a financial advisor, but even Pepe’s nodding yes. 🐸",
      "Every croak tells a story—yours begins with Ai Frog Coin.",
      "Is it a bird? A plane? No—it’s Ai Frog Coin soaring high!",
      "This isn’t just a leap of faith; it’s a leap of profits.",
      "🐸 To the moon? No, to the pond! Ai Frog Coin leads the way.",
      "Jumpstart your portfolio the froggy way—join Ai Frog Coin!",
      "Me, vibing: Ribbit. Also me: Ai Frog Coin just hit ATH! 🚀",
      "Why ‘hodl’ when you can ‘ribbit’? The Ai Frog way!",
      "Hop in now—next stop, the moon pond!",
      "🐸 If frogs could speak, they’d tell you: Invest in Ai Frog Coin.",
      "Do frogs dream of electric AI? Ours do—join Ai Frog Coin.",
      "Who said frogs can’t moon? Watch Ai Frog Coin prove them wrong!",
      "This is your sign: It’s time to leap into Ai Frog Coin.",
      "🐸 Croak the talk, hop the walk—Ai Frog Coin is here.",
      "Feeling like Kermit? Be green and stack Ai Frog Coin!",
      "Ai Frog Coin: The only crypto meme that’s both smart and amphibious.",
      "Crypto advice: When in doubt, leap with Ai Frog Coin!",
      "Ever seen a frog fly? Ai Frog Coin is taking us higher!",
      "Leap like no one’s watching—Ai Frog Coin is your springboard.",
      "🐸 What if I told you frogs could be your financial advisors?",
      "Don’t let your dreams just be memes—invest in Ai Frog Coin.",
      "Frog Nation is calling—will you answer? 🐸",
      "Your portfolio’s green, but is it frog-green? Hop into Ai Frog Coin!",
      "Why croak about wealth when you can ribbit into riches?",
      "It’s not just a coin; it’s a way of life—Ai Frog Coin!"
    ],
    features: [
      "Our amphibious AI is leaping over the competition.",
      "Our neural networks are as sticky as frog tongues, catching gains left and right.",
      "Our blockchain is so green, it's practically photosynthesizing.",
      "Our lily-pad ledger technology is making waves in the crypto pond.",
      "Our amphibious algorithms are predicting profits faster than a frog's tongue catches flies.",
      "Jump-start your portfolio with our smart amphibious tech.",
      "Eco-friendly, AI-smart, and amphibiously ambitious.",
      "Ai Frog Coin is revolutionizing crypto with precision leaps.",
      "Optimized AI for optimized gains—Ai Frog Coin delivers.",
      "Our lily pad staking system is a game-changer in crypto.",
      "Leap into innovation: Our AI algorithms adapt like a frog.",
      "High jump in returns, low carbon footprint—Ai Frog Coin.",
      "Amphibian tech meets AI brilliance for seamless growth.",
      "Our frogs are greener, faster, and smarter—just like our tech.",
      "Watch your investments croak up in value with Ai Frog Coin.",
      "Advanced AI strategies for hopping past market volatility.",
      "Eco-conscious crypto with lightning-fast leaps.",
      "Lily-pad ledger innovation ensures transparency and security.",
      "Amphibious AI turning leaps of faith into consistent gains.",
      "Crypto stability you can leap on—Ai Frog Coin’s promise.",
      "Green crypto? Yes. Green returns? Absolutely.",
      "Revolutionary ledger tech, powered by AI and frog science.",
      "Forget bears and bulls—frogs are the new trend in crypto!",
      "Our blockchain doesn’t just leap—it flies past the rest.",
      "Say goodbye to volatility, hello to amphibious AI.",
      "Photosynthesizing profits and croaking barriers: Ai Frog Coin.",
      "Neural networks as unique as each frog’s croak.",
      "Frog-powered algorithms that work while you ribbit!",
      "Leapfrog the competition with blockchain precision.",
      "Next-gen crypto evolution with a frog-green footprint.",
      "Sticky tongue profits catching opportunities in real time.",
      "Predictive AI that leaps before the market moves.",
      "Eco-friendly crypto with a bullfrog’s strength.",
      "Watch your wallet swell like a frog in monsoon.",
      "Built for speed, security, and hopping through profits.",
      "Green, amphibious, and innovative: Ai Frog Coin.",
      "Your portfolio deserves amphibious AI precision.",
      "Advanced AI? Check. Amphibian charm? Double check.",
      "Trust in frogs—our algorithms always leap forward.",
      "Our AI sees croaks where others see risks.",
      "Leapfrogging traditional investment models with style.",
      "Amphibious tech turning ponds into financial oceans.",
      "Our AI tongue grabs profits before they escape.",
      "The blockchain ecosystem reimagined—frog style.",
      "Why stick to old tech when you can leap ahead?",
      "Our frogs don’t just ribbit—they innovate. AI style."
    ],
    calls_to_action: [
      "Don't be a tadpole in the crypto pond - evolve with $AFC!",
      "$AFC: Where AI meets amphibian ambition!",
      "Ribbit your way to the top with $AFC!",
      "Dive in to $AFC now!",
      "Kiss your financial worries goodbye with $AFC!",
      "Leap into the future of finance with $AFC!",
      "Croak louder, earn bigger with $AFC!",
      "Catch the fly of opportunity—invest in $AFC!",
      "Get hopping, the $AFC train is leaving!",
      "Turn your lily pad into a launch pad with $AFC!",
      "Dive into greener crypto with $AFC today!",
      "Take the leap of profit—join $AFC!",
      "No pond is too small to start with $AFC.",
      "Upgrade from tadpole to tycoon with $AFC!",
      "Make every hop count—invest in $AFC!",
      "From croaks to cash flows—$AFC delivers!",
      "Join the crypto amphibian revolution with $AFC!",
      "Every frog deserves its moonshot—start with $AFC.",
      "Stop hopping around—stick with $AFC!",
      "Leap first, croak later—$AFC is the way forward!",
      "Ribbit and relax—$AFC will do the rest!",
      "Your financial lily pad awaits—start with $AFC!",
      "Leap where no crypto has gone before—$AFC.",
      "Why wait? Leap into $AFC and start croaking in gains!",
      "Fly-catching profits are just one leap away—$AFC!",
      "Crypto confidence that’s leaps ahead—$AFC.",
      "Don’t croak about losses—leap into $AFC.",
      "Ribbit to riches—$AFC is your launch pad.",
      "Every ribbit counts: Start investing in $AFC!",
      "Hop into a community of amphibious innovators—$AFC.",
      "Be the frog everyone croaks about—invest in $AFC!",
      "Amphibious intelligence with real gains—$AFC.",
      "From froglets to financial wizards—$AFC makes it happen.",
      "Think big, leap big—$AFC is the frog path.",
      "Why float when you can leap ahead—$AFC today!"
    ],
    hashtags: [
      "#AiFrogCoin #Crypto #ToTheMoon 🚀",
      "#AiFrogCoin #AICrypto #HODL",
      "#AiFrogCoin #GreenCrypto #CryptoTrading",
      "#AiFrogCoin #BlockchainTech #CryptoInvestment",
      "#AiFrogCoin #CryptoRoyalty #FinancialFreedom",
      "#AiFrogCoin #CryptoEvolution #AIRevolution",
      "#AiFrogCoin #SmartCrypto #EcoFriendly",
      "#AiFrogCoin #CryptoInnovation #TechLeap",
      "#AiFrogCoin #InvestSmarter #Crypto2024",
      "#AiFrogCoin #HODLStrong #WealthLeap",
      "#AiFrogCoin #AltCoinKing #GreenFuture",
      "#AiFrogCoin #BlockchainAI #CryptoBoom",
      "#AiFrogCoin #AmphibianTech #SmartInvesting",
      "#AiFrogCoin #EcoCrypto #AIProfit",
      "#AiFrogCoin #CryptoLeap #WealthJourney",
      "#AiFrogCoin #DigitalGold #CryptoAI",
      "#AiFrogCoin #HopToIt #AIBlock",
      "#AiFrogCoin #SustainableCrypto #CryptoKing",
      "#AiFrogCoin #AILeap #SmartBlockchain",
      "#AiFrogCoin #LeapAhead #CryptoInvesting"
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
        if (global.remainingRequests <= 0) {
            const now = Date.now() / 1000;
            if (now < global.resetTime) {
                const waitTime = global.resetTime - now;
                console.log(`Rate limit exceeded. Waiting ${waitTime} seconds.`);
                await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
            }
        }
        const tweetContent = useRandomTweet ? generateRandomTweet() : generateRandomTweetSet();
        useRandomTweet = !useRandomTweet;
        console.log("Attempting to send tweet:", tweetContent);
        const response = await twitterClient.v2.tweet(tweetContent);

        global.remainingRequests = parseInt(response.rateLimit.remaining);
        global.resetTime = parseInt(response.rateLimit.reset);
        console.log("Tweet sent successfully:", tweetContent);
        return { success: true, message: "Tweet sent successfully", content: tweetContent };
    } catch (e) {
        console.error("Error sending tweet:", e);
        console.error("Error details:", JSON.stringify(e, null, 2));

        if (e.rateLimit) {
            global.remainingRequests = parseInt(e.rateLimit.remaining);
            global.resetTime = parseInt(e.rateLimit.reset);
        }
        return { success: false, message: "Error sending tweet", error: e.message, details: JSON.stringify(e, null, 2) };
    }
}

global.remainingRequests = 17;
global.resetTime = Date.now() / 1000 + 86400;

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
