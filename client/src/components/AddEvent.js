import React, { useState, useContext } from 'react';
import { Context } from '../store';
import { Modal, Form, Button } from 'react-bootstrap';
import * as dateFns from 'date-fns';
import TimePicker from 'react-time-picker';
import axios from 'axios';

import Message from './Message';
import Loading from './Loading';

const AddEvent = ({ edit, eventId }) => {
    const [{ events }, dispatch] = useContext(Context);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    //FORM FIELDS STATE
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('12:00');
    const [location, setLocation] = useState('');
    const [people, setPeople] = useState('');

    const submitFormHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            //Check if user has inputted date in a valid format
            if (!dateFns.isValid(new Date(date))) {
                setError('Please enter a valid date.');
                setLoading(false);
                //Check if we are in edit mode or new event mode. If editing, perform patch request. Otherwise, post request.
            } else if (!edit) {
                const newEvent = await axios.post('/api/event', {
                    title,
                    date: dateFns.format(new Date(date), 'MM/dd/yy'),
                    startTime,
                    location,
                    people
                }, { 'Content-Type': 'application/json' });
                setLoading(false);
                //Update events in app state by adding new event 
                dispatch({ type: 'SET_EVENTS', payload: events.concat(newEvent.data.event) });
                handleClose();
            } else {
                const updatedEvent = await axios.patch(`/api/event/${eventId}`, {
                    title,
                    date,
                    startTime,
                    location,
                    people
                }, { 'Content-Type': 'application/json' });
                setLoading(false);
                //Update events in app state by replacing edited event with new version
                dispatch({ type: 'SET_EVENTS', payload: events.filter(ev => ev._id !== eventId).concat(updatedEvent.data.event) });
                handleClose();
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Something went wrong');
            setLoading(false);
        }
    };

    //Close the modal
    const handleClose = () => {
        setShow(false);
        setError(null);

        //Reset form fields
        setTitle('');
        setDate('');
        setStartTime('12:00');
        setLocation('');
        setPeople('');
    };

    //Open the modal
    const handleShow = () => {
        setShow(true);
        //If we are in edit mode, set values of form fields to current values for event
        if (eventId) {
            const event = events.filter(ev => ev._id === eventId)[0];
            setTitle(event.title);
            setDate(event.date);
            setStartTime(event.startTime);
            setLocation(event.location);
            setPeople(event.people);
        }
    };

    return (
        <React.Fragment>
            {edit ?
                <Button
                    className="btn-symbol mr-1 p-1"
                    variant="outline-dark"
                    onClick={handleShow}><i className="fas fa-edit"></i></Button>
                :
                <div
                    className="add-event text-center m-0"
                    onClick={handleShow}><i className="fas fa-plus"></i></div>}
            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-cyan">{edit ? 'Edit Event' : 'New Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form role="form" data-toggle="validator" onSubmit={(e) => submitFormHandler(e)}>
                        {error && <Message message={error} />}
                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={title}
                                placeholder="Enter event title"
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center justify-content-between">
                            <Form.Label className="mr-3">Date</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={date}
                                placeholder="mm/dd/yy"
                                onChange={(e) => setDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Time</Form.Label>
                            <TimePicker
                                disableClock={true}
                                format='h:mm a'
                                value={startTime}
                                hourPlaceholder="12"
                                minutePlaceholder="00"
                                onChange={(value) => setStartTime(value)}
                            />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">People</Form.Label>
                            <Form.Control
                                type="text"
                                value={people}
                                onChange={(e) => setPeople(e.target.value)} />
                        </Form.Group>

                        <Button
                            variant="dark"
                            type="submit">{loading ? <Loading /> : edit ? 'Update Event' : 'Add Event'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default AddEvent;
