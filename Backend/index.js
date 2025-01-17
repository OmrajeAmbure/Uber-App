const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');   
const userRoutes = require('../Backend/routes/user.routes');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const { cookie } = require('express-validator');
const captionRoute = require('./routes/caption.routes');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);

app.use('/captions', captionRoute);

module.exports = app;