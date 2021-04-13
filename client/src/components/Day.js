import React from 'react';
import * as dateFns from 'date-fns';

const Day = ({ day, month, endOfMonth, clicked }) => {
    return (
        <td
            className={
                `text-center 
                ${dateFns.isBefore(day, month) || dateFns.isAfter(day, endOfMonth) ? 'text-muted' : 'text-dark'}`}
            onClick={() => { clicked(day); }}>
            <p className={`${dateFns.isToday(day) && 'circled'}`}
            >{dateFns.getDate(day)}</p>
        </td>
    );
};

export default Day;
