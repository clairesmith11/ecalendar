import React, { useState } from 'react';
import * as dateFns from 'date-fns';

const Day = ({ day, month, endOfMonth, clicked, events }) => {
    const convertDate = (date) => {
        const dateToConvert = new Date(date);
        return dateToConvert.toUTCString();
    };
    //Determine if the selected day has any events 
    const [dayHasEvent] = useState(events.filter(event => dateFns.format(new Date(event.date), 'MM/dd/yyyy') === dateFns.format(day, 'MM/dd/yyyy')));
    const [dayy] = useState(events.map(event => new Date(event.date).toString().split(' ').splice(0, 4).join(' ')));
    const [clickedDay] = useState(day.toString().split(' ').splice(0, 4).join(' '));
    return (
        <td
            className={
                `day
                text-center 
                ${dateFns.isBefore(day, month) || dateFns.isAfter(day, endOfMonth) ? 'text-light-gray' : 'text-dark'}`}
            onClick={() => { clicked(day); }}>
            <p className={`${dateFns.isToday(day) && 'circled'} m-0`}
            >{dateFns.getDate(day)}</p>
            <p className={dayHasEvent.length > 0 ? 'event-marker d-inline-block m-0' : 'd-none'}>&#183;</p>
        </td>
    );
};

export default Day;
