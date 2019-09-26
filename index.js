const request = require('request');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://zhukevichs:153945530@cluster0-5bbdu.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false);

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})