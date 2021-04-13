import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import AddEventForm from './AddEventForm';

const AddEvent = () => {
    const [show, setShow] = useState(false);

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
                    <AddEventForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        Add Event
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default AddEvent;
