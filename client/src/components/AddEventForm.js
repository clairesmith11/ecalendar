import React from 'react';
import { Form } from 'react-bootstrap';

const AddEventForm = () => {
    return (
        <Form>
            <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3">Title</Form.Label>
                <Form.Control type="text" placeholder="Enter event title" />
            </Form.Group>

            <Form.Group className="d-flex align-items-center justify-content-between">
                <Form.Label className="mr-3">Start Date</Form.Label>
                <Form.Control type="text" placeholder="mm/dd/yy" />

                <Form.Label className="mx-3">End Date</Form.Label>
                <Form.Control type="text" placeholder="mm/dd/yy" />
            </Form.Group>

            <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3">Time</Form.Label>
                <Form.Control type="text" placeholder="__:__" />
            </Form.Group>

            <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3">Location</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3">Description</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
        </Form>
    );
};

export default AddEventForm;
