const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.DB_CONNECT,{ })
    .then(() => console.log('MongoDB Connected...')
)
    .catch((err) => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;
