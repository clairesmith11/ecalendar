import React from 'react';
import * as dateFns from 'date-fns';

import AddEvent from './AddEvent';

const Events = ({ selectedDay }) => {
    const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsLong = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    //Isolate individual data from the entire date object we received in props
    const selectedDayOfWeek = dateFns.getDay(selectedDay);
    const selectedMonth = dateFns.getMonth(selectedDay);
    const selectedDate = dateFns.getDate(selectedDay);

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
                    <p>No appointments</p>
                </div>
            </div>
            <AddEvent />
        </div>
    );
};

export default Events;
