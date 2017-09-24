'use strict';

const mongo = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const base58 = require('base58');

const dbURL = `mongodb://${process.env.USER}:${process.env.PASSWORD}` + 
      `@ds1${process.env.SECRET}.mlab.com:${process.env.SECRET}/${process.env.DB_NAME}`;
const appURL = 'https://url-shortener-microservice-aa.glitch.me/';

const app = express();

var db;
mongo.connect(dbURL, (err, database) => {
    if(err) throw err;
    db = database;
    app.listen(3000);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
});

app.get('/:shortURL', (req, res) => {
    const short_url = req.params.shortURL;
    const urls = db.collection('urls');
    urls.findOne(
        { short_url: short_url },
        (err, doc) => {
            if (err) throw err;
            doc
                ? res.redirect(301, doc.original_url)
                : res.send({ error: 'URL doesn\'t exit' });
        });
});

app.get('/new/:reqURL*', (req, res) => {
    const url = req.params.reqURL + req.params[0];    
    if (!isValidURL(url)) {
        res.send({ error: 'URL is not valid, try again' });
    } else {
        const urls = db.collection('urls');
        const counters = db.collection('counters');
        urls.findOne(
            {original_url: url},
            (err, doc) => {
                if (err) throw err;
                if (doc) {
                    res.send({
                        original_url: doc.original_url,
                        short_url: appURL + doc.short_url
                    });  
                } else {
                    counters.findAndModify(
                        { _id: 'urlid' },
                        [],
                        { $inc: { seq: 1 } },
                        { new: true , upsert: true },
                        (err, counterDoc) => {
                            const shortUrl = base58.encode(counterDoc.value.seq);
                            urls.insert(
                                {
                                    original_url: url,
                                    short_url: shortUrl
                                }, (err, doc) => {
                                    const docBody = doc.ops[0]; 
                                    res.send({
                                        original_url: docBody.original_url,
                                        short_url: appURL + shortUrl
                                    });  
                                });
                        });
                }
            });
    }
});

function isValidURL(url) {
    return (/^https?:\/\/[^.\s]+\.[^.\s]+(?:.[^.\s]+)*$/gi).test(url);
}