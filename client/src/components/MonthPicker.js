import React from 'react';
import { Button } from 'react-bootstrap';

const MonthPicker = ({ month, prev, next }) => {
    const monthsShort = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (
        <div className="month-picker my-5 text-center d-flex justify-content-around">
            <Button
                className="month-picker__link"
                variant="link"
                onClick={prev}>{monthsShort[month === 0 ? 11 : month - 1]}</Button>
            <h2>{monthsShort[month]}</h2>
            <Button
                className="month-picker__link"
                variant="link"
                onClick={next}>{monthsShort[month === 11 ? 0 : month + 1]}</Button>
        </div>
    );
};

export default MonthPicker;
