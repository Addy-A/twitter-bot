require("dotenv").config({ path: __dirname + "/.env" });
const twitterClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
  
const tweet = async () => {
    try {
        await twitterClient.v2.tweet("Hello world!");
        console.log("Tweet sent successfully!");
    } catch (e) {
        console.error("Error sending tweet:", e);
    }
}


const cronTweet = new CronJob("30 * * * * *", async () => {
    tweet();
});

cronTweet.start();
