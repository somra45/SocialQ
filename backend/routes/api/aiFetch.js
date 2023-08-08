const express = require('express');
const router = express.Router();
const { aiApiKey } = require('../../config/keys');
const axios = require('axios');
var debug = require('debug');
const dbLogger = debug('backend:mongodb');
const serverLogger = debug('backend:server');

router.post('/', /*requireUser*/ async (req, res, next) => {
    const instructions = req.body?.instructions;
    // const pastTwets = req.body.pastTweets;
    dbLogger(instructions)
    serverLogger(instructions)
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${aiApiKey}`
        }};
    axios.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo",
            "messages": [{
                "role": "user",
                "content": instructions
            }],
            "temperature": 0.7
        }, options)
        .then(response => {
            res.json(response.data.choices[0].message.content)
    })
        .catch(err =>{
            console.log(`error! error is: ${err}`)
            res.status(500).send('Internal Server Error');
        })
})


module.exports = router;