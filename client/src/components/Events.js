import React, { useContext } from 'react';
import { Context } from '../store';
import { Button } from 'react-bootstrap';
import * as dateFns from 'date-fns';
import axios from 'axios';

import AddEvent from './AddEvent';

const Events = ({ selectedDay }) => {
    const [{ events }, dispatch] = useContext(Context);


    const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsLong = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    //Isolate individual data from the entire date object we received in props
    const selectedDayOfWeek = dateFns.getDay(selectedDay);
    const selectedMonth = dateFns.getMonth(selectedDay);
    const selectedDate = dateFns.getDate(selectedDay);

    //Check whether any of the saved events are happening on the selected day and sort those events earliest to latest by start time
    const dayHasEvent = events
        .filter(event => new Date(event.date).toString() === selectedDay.toString())
        .sort((a, b) => +a.startTime.split(':')[0] - +b.startTime.split(':')[0]);

    //Since time is saved as a 24-hour hh:mm string in our DB, convert the time to 12-hour with AM or PM
    const formatTime = (time) => {
        let hour = +time.split(':')[0];
        const minutes = time.split(':')[1];

        if (hour < 12) {
            return `${hour}:${minutes} AM`;
        } else if (hour === 12) {
            return `${hour}:${minutes} PM`;
        } else {
            hour = hour - 12;
            return `${hour}:${minutes} PM`;
        }
    };

    //Determine the season of the selected month so we can display a relevant background image
    let season;
    if (selectedMonth >= 2 && selectedMonth <= 4) {
        season = 'spring';
    } else if (selectedMonth >= 5 && selectedMonth <= 7) {
        season = 'summer';
    } else if (selectedMonth >= 8 && selectedMonth <= 10) {
        season = 'fall';
    } else {
        season = 'winter';
    }

    //Remove event from the DB when the delete button is clicked. Display an alert for confirmation.
    const deleteEventHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:5000/api/event/${id}`);

                dispatch({ type: 'SET_EVENTS', payload: events.filter(event => event._id !== id) });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={`events my-5 d-flex flex-column text-dark ${season}`}>
            <h3 className="m-0">{daysLong[selectedDayOfWeek]}</h3>
            <h2>{monthsLong[selectedMonth]} {selectedDate}</h2>
            <div className="events-list__container">
                <div className="events-list my-2">
                    {dayHasEvent.length === 0
                        ? <p>No appointments</p>
                        : dayHasEvent.map(event => {
                            return (
                                <div key={event._id} className="d-flex justify-content-between align-items-center">
                                    <p className="event-title"><strong>{formatTime(event.startTime)}</strong> {event.title}</p>
                                    <div>
                                        <AddEvent edit eventId={event._id} />
                                        <Button
                                            className="btn-symbol p-1"
                                            variant="danger"
                                            onClick={() => deleteEventHandler(event._id)}>&#128465;</Button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <AddEvent />
        </div>
    );
};

export default Events;
