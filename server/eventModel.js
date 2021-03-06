const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    location: String,
    people: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;