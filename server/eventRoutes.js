const express = require('express');
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('./eventController');

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(createEvent);

router.route('/:id')
    .get(getEventById)
    .patch(updateEvent)
    .delete(deleteEvent);

module.exports = router;