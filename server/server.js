const express = require('express'); // 1
const app = express(); // 1
const bodyParser = require("body-parser");
const utils = require('./utils/utils');
const fs = require('fs');

app.use((req, res, next) => { // 2
    bodyParser.json();
    bodyParser.urlencoded({ extended: true });   // allows parsing of the value of the request body
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
    // if (req.method === "OPTIONS") {
    //     console.log('in options');
    //     res.status(200).end();
    // }
    next();
});

const port = process.env.PORT || 3600;// 3

app.get('/api/customer/:customerId/tags', (req, res) => { //4
    let customerId = parseInt(req.params.customerId);

    fs.readFile('assets/transactions.json', 'utf8', (err, data) => {
        if (data) {
            let filteredTransactionTags = [];
            filteredTransactionTags = JSON.parse(data).filter((transaction) => {
                if (transaction.ACCOUNT_CUSTOMER_UID === customerId) { return true; }
            });
            console.log(filteredTransactionTags);
            res.send(JSON.stringify(filteredTransactionTags));

        }
    })
})

app.post('/signedrequest', (req, res) => {
    let reqBody = req.body;
    const p = JSON.parse(reqBody);
    res.send(reqBody);

    // const parsed = JSON.parse(reqBody);
    // console.log(parsed);
})


app.listen(port); // 5
console.log(`Port running on ${port}`);