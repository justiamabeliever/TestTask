const express = require('express');
const router = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');
const randomString = require('random-string');
const Cookies = require('cookies');

const Currency = require('../models/Currency');
const UserCurrency = require('../models/UserCurrency');
const CryptoCouple = require('../models/CryptoCouple');
const key = require('../config/jwt');

const cookiekeys = ['keyboard cat'];

const url = 'https://api.hitbtc.com/api/2/public/ticker';

request(url, (err, res, body) => {
    if(err) throw err;
    const data = JSON.parse(body);;
    for(let i = 0; i < data.length; i++){
        let newCurrency = new Currency({
            symbol: data[i].symbol,
            last: data[i].last,
            timestamp: data[i].timestamp
        });
        newCurrency.save();
    }
})

router.get('/', (req, res, next) => {
    Currency.find((err, resultCur) => {
        if(err) throw err;
        console.log(resultCur.length);
        res.render('home', {
            currencies: resultCur.sort()
        })
    }).sort({timestamp:-1}).limit(901)
})

router.get('/currencies', (req, res) => {
    let random = randomString;
    let token = jwt.sign({foo: random}, key);
    console.log('Your token: ' + token);

    let cookies = new Cookies(req, res, {keys: cookiekeys});
    let lastVisit = cookies.get('LastVisit', {signed: true});

    if(!lastVisit){
        cookies.set('LastVisit', token, {signed: true});
    }
    
    Currency.distinct('symbol', (err, resultCur) => {
        if(err) throw err;
        res.render('currencies', {
            currencies: resultCur.sort()
        })
    })
})

router.post('/currencies', (req, res) => {
    let cookies = new Cookies(req, res, {keys: cookiekeys});
    let lastVisit = cookies.get('LastVisit', {signed: true});
    
    console.log('Post token:' + lastVisit);
    console.log('Value: '+req.body.last+';\nSymbol: '+req.body.symbol);

    if(!req.body.last) {
        res.send('Enter your currency');
    }
    else if(!lastVisit) {
        res.send('Please log in')
    }
    else {
        let newCryptoCouple = new CryptoCouple({
            symbol: req.body.symbol
        });
        newCryptoCouple.save();
    
        let newUserCurrency = new UserCurrency({
            value: req.body.last,
            timestamp: req.body.timestamp,
            symbolId: newCryptoCouple._id,
            token: lastVisit
        });
        newUserCurrency.save();
        res.redirect('/currencies');
    }
})

router.get('/logout', (req, res) =>{
    let cookies = new Cookies(req, res, {keys: cookiekeys});
    cookies.set('LastVisit', {maxAge: Date.now()},{signed: false});
    res.send('You are logged out');
})


module.exports = router;