const { nextDay } = require('date-fns');
const asyncHandler = require('express-async-handler');
const Event = require('./eventModel');

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json({ events });
});

const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        res.status(200).json({ event });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

const createEvent = asyncHandler(async (req, res) => {

    const newEvent = await Event.create(req.body);
    res.status(200).json({ event: newEvent });

});

const updateEvent = asyncHandler(async (req, res) => {

    const event = await Event.findById(req.params.id);

    if (event) {
        event.title = req.body.title;
        event.date = req.body.date;
        event.startTime = req.body.startTime;
        event.location = req.body.location;
        event.people = req.body.people;

        const updatedEvent = await event.save();
        res.json({ event: updatedEvent });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }

});

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (event) {
        res.json({
            message: 'Event deleted'
        });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }

});

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
