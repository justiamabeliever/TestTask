const mongoose = require('mongoose')

const CurrencySchema = new mongoose.Schema({
    symbol: {
        type: String
    },
    timestamp: {
        type: Date,
    },
    last: {
        type: Number
    }
})

const Currency = mongoose.model('Currency', CurrencySchema)
module.exports = Currency