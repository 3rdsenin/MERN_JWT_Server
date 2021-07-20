const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { db } = require('./config/config');
const api = require('./routes');
const { isAuthenticated } = require('./middleware');

const app = express();

//whitelist 

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());




mongoose.connect(db.mongoURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to MongoDB')
}).catch((err) => {
    console.log('error', err);
})


app.get("/", (req, res) => {
    res.json({
        message: `Welcome to Annie's Backend server`
    });
});

app.use("/api/v1", api);

app.use(isAuthenticated);

module.exports = app;