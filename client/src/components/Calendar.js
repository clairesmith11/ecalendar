import React, { useState } from 'react';
import { Table, Col } from 'react-bootstrap';
import * as dateFns from "date-fns";

import Header from './Header';
import MonthPicker from './MonthPicker';
import Events from './Events';
import Day from './Day';

const Calendar = () => {
    const [today] = useState(new Date());
    const [month, setMonth] = useState(dateFns.getMonth(today));
    const [year, setYear] = useState(dateFns.getYear(today));
    const [selectedDay, setSelectedDay] = useState(today);

    const daysShort = ['Sun', 'Mon', 'Tues', 'Wed', "Thu", "Fri", "Sat"];
    const selectedMonth = new Date(year, month);
    const endOfMonth = dateFns.lastDayOfMonth(selectedMonth);
    const firstWeekOfMonthStart = dateFns.startOfWeek(selectedMonth);
    const lastWeekOfMonthEnd = dateFns.endOfWeek(endOfMonth);

    //Find number of days for selected month
    const getDaysInMonth = () => {
        let rows = [];
        let days = [];
        let day = firstWeekOfMonthStart;

        //Loop for as long as the day is before the last day of the final week of the month
        while (day <= lastWeekOfMonthEnd) {
            for (let i = 1; i <= 7; i++) {
                days.push({ day });
                //Increment the day forward by one
                day = dateFns.addDays(day, 1);
            }
            //Add all days in a single week to a row
            rows.push(days);
            days = [];
        }

        return rows;
    };

    //Increment the month by one
    const nextMonth = () => {
        setMonth(prevState => {
            if (prevState >= 11) {
                setYear(year + 1);
                return 0;
            } else {
                return prevState + 1;
            }
        });
    };

    //Decrement the month by one
    const prevMonth = () => {
        setMonth(prevState => {
            if (prevState <= 0) {
                setYear(year - 1);
                return 11;
            } else {
                return prevState - 1;
            }
        });
    };

    //Set the selected day in state when clicked
    const selectDayHandler = (day) => {
        setSelectedDay(day);
    };

    return (
        <React.Fragment>
            <Col>
                <Header year={year} />
                <MonthPicker month={month} prev={prevMonth} next={nextMonth} />
                <div className="calendar d-flex align-items-center">
                    <p className="arrow" onClick={prevMonth}>&larr;</p>
                    <Table className="my-3">
                        <thead className="text-center">
                            <tr>
                                {daysShort.map(day => {
                                    return (
                                        <td className="text-cyan" key={day}>{day.toUpperCase()}</td>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {getDaysInMonth().map((week, index) => {
                                return (
                                    <tr key={index}>
                                        {week.map(d => {
                                            return <Day
                                                key={d.day}
                                                day={d.day}
                                                month={selectedMonth}
                                                endOfMonth={endOfMonth}
                                                clicked={selectDayHandler} />;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <p className="arrow" onClick={nextMonth}>&rarr;</p>
                </div>
            </Col>
            <Col>
                <Events selectedDay={selectedDay} selectedMonth={selectedMonth} />
            </Col>
        </React.Fragment>
    );
};

export default Calendar;
