const { nextDay } = require('date-fns');
const asyncHandler = require('express-async-handler');
const Event = require('./eventModel');

const getEvents = asyncHandler(async (req, res) => {

    const events = await Event.find();

    res.status(200).json({ events });
});

const createEvent = asyncHandler(async (req, res) => {

    const newEvent = await Event.create(req.body);
    res.status(200).json({ event: newEvent });

});

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    res.json({
        message: 'Event deleted'
    });
});

exports.getEvents = getEvents;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;