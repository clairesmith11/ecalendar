import React from 'react';
import { Button } from 'react-bootstrap';
import * as dateFns from 'date-fns';

import AddEvent from './AddEvent';

const Events = ({ selectedDay, events }) => {
    const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsLong = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    //Isolate individual data from the entire date object we received in props
    const selectedDayOfWeek = dateFns.getDay(selectedDay);
    const selectedMonth = dateFns.getMonth(selectedDay);
    const selectedDate = dateFns.getDate(selectedDay);

    const dayHasEvent = events.filter(event => new Date(event.date).toString() === selectedDay.toString());

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


    return (
        <div className={`events my-5 d-flex flex-column pt-4 px-4 text-dark ${season}`}>
            <h3 className="m-0">{daysLong[selectedDayOfWeek]}</h3>
            <h2>{monthsLong[selectedMonth]} {selectedDate}</h2>
            <div className="events-list__container pl-4">
                <div className="events-list my-2">
                    {dayHasEvent.length === 0
                        ? <p>No appointments</p>
                        : dayHasEvent.map(event => {
                            return (
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <p key={event._id}><strong>{formatTime(event.startTime)}</strong> {event.title}</p>
                                    <div>
                                        <Button className="btn-symbol mr-1 p-1" type="primary">&#9998;</Button>
                                        <Button className="btn-symbol p-1" type="danger">&#128465;</Button>
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
