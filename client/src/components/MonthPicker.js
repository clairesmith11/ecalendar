import React from 'react';

const MonthPicker = ({ month }) => {
    const monthsShort = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
        <div className="month-picker my-3 text-center d-flex justify-content-around align-items-center text-dark">
            <h3 className="month-picker__link">{monthsShort[month === 0 ? 11 : month - 1]}</h3>
            <h2 className="month-picker__active">{monthsShort[month]}</h2>
            <h3 className="month-picker__link">{monthsShort[month === 11 ? 0 : month + 1]}</h3>
        </div>
    );
};

export default MonthPicker;
