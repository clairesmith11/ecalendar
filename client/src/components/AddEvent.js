import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import * as dateFns from 'date-fns';
import TimePicker from 'react-time-picker';
import axios from 'axios';

import Message from './Message';

const AddEvent = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('12:00');
    const [location, setLocation] = useState('');
    const [people, setPeople] = useState('');
    const [error, setError] = useState(null);

    const submitFormHandler = async (e) => {
        e.preventDefault();

        try {
            if (!dateFns.isValid(new Date(date))) {
                setError('Please enter a valid date');
            } else {
                axios.post('http://localhost:5000/api/event', {
                    title,
                    date,
                    startTime,
                    location,
                    people
                }, {
                    'Content-Type': 'application/json'
                });
                handleClose();
            }
        } catch (error) {
            setError(error.response.data.message ? error.response.data.message : 'Something went wrong');
        }
    };


    //Close the modal
    const handleClose = () => setShow(false);
    //Open the modal
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <div className="add-event text-center m-0" onClick={handleShow}>+</div>
            <Modal className="modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-cyan">New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form role="form" data-toggle="validator" onSubmit={(e) => submitFormHandler(e)}>
                        {error && <Message message={error} />}
                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter event title"
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center justify-content-between">
                            <Form.Label className="mr-3">Date</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="mm/dd/yy"
                                onChange={(e) => setDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Time</Form.Label>
                            <TimePicker
                                disableClock={true}
                                format='h:mm a'
                                onChange={(value) => setStartTime(value)}
                            />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Location</Form.Label>
                            <Form.Control type="text" onChange={(e) => setLocation(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3">Description</Form.Label>
                            <Form.Control type="text" onChange={(e) => setPeople(e.target.value)} />
                        </Form.Group>

                        <Button
                            variant="dark"
                            type="submit">Add Event</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default AddEvent;
