const mongoose = require('mongoose')

const CryptoCoupleSchema = new mongoose.Schema({
    symbol: {
        type: String
    }
})

const CryptoCouple = mongoose.model('CryptoCouple', CryptoCoupleSchema)
module.exports = CryptoCouple