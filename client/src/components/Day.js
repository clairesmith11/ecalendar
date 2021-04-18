import React from 'react';
import * as dateFns from 'date-fns';

const Day = ({ day, month, endOfMonth, clicked, events }) => {

    //Determine if the selected day has any events 
    const dayHasEvent = events.filter(event => new Date(event.date).toString() === day.toString());

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
