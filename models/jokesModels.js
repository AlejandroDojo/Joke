const mongoose = require('mongoose');

const currentTime = new Date().toLocaleString();

const CollectionJokes = mongoose.Schema({
    setup: {
        type: String,
        required: true,
        minLength: 10
    },
    punchline: {
        type: String,
        required: true,
        minLength: 3
    },
    createdAt: {
        type: String,
        default: currentTime
    },
    updatedAt: {
        type: String,
        default: currentTime
    }
});

const Joke = mongoose.model('jokes', CollectionJokes);

module.exports = Joke;