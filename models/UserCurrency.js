const mongoose = require('mongoose')

const UserCurrencySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: true
    },
    symbolId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

const UserCurrency = mongoose.model('UserCurrency', UserCurrencySchema)
module.exports = UserCurrency