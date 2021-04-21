import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store';
import { Table, Col } from 'react-bootstrap';
import * as dateFns from "date-fns";
import axios from 'axios';

import Header from './Header';
import MonthPicker from './MonthPicker';
import Events from './Events';
import Day from './Day';
import Message from './Message';
import Loading from './Loading';

const Calendar = () => {
    const [{ events }, dispatch] = useContext(Context);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //State for determining date values for current selection and initial values (app will initialize on today's date)
    const [today] = useState(new Date());
    const [month, setMonth] = useState(dateFns.getMonth(today));
    const [year, setYear] = useState(dateFns.getYear(today));
    const [selectedDay, setSelectedDay] = useState(today);

    const daysShort = ['Sun', 'Mon', 'Tues', 'Wed', "Thu", "Fri", "Sat"];
    const selectedMonth = new Date(year, month);
    //Find date of last day of the month
    const endOfMonth = dateFns.lastDayOfMonth(selectedMonth);
    //For the week that contains the first day of the month, find the first day of that week (if month does not start on Sunday, days from previous month will be shown) 
    const firstWeekOfMonthStart = dateFns.startOfWeek(selectedMonth);
    //For the week that contains the last day of the month, find the last day of that week (if month does not end on Saturday, days from next month will be shown)
    const lastWeekOfMonthEnd = dateFns.endOfWeek(endOfMonth);

    //Fetch events from DB on page load
    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('http://localhost:5000/api/event');
                //Set app state to results of getEvents call
                dispatch({ type: 'SET_EVENTS', payload: data.events });
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Something went wrong');
                setLoading(false);
            }
        };
        getEvents();
    }, [dispatch]);

    //Display calendar
    const getDaysInMonth = () => {
        let rows = [];
        let days = [];
        let day = firstWeekOfMonthStart;

        //Loop as long as the day is before the last day of the final week of the month
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
                {error && <Message message={error} />}
                <div className="calendar d-flex align-items-center justify-content-center">
                    {loading ? <Loading /> :
                        <>
                            <i className="arrow fas fa-chevron-left" onClick={prevMonth}></i>
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

                                {events && <tbody>
                                    {getDaysInMonth().map((week, index) => {
                                        return (
                                            <tr key={index}>
                                                {week.map(d => {
                                                    return <Day
                                                        key={d.day}
                                                        day={d.day}
                                                        month={selectedMonth}
                                                        endOfMonth={endOfMonth}
                                                        events={events}
                                                        clicked={selectDayHandler} />;
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>}
                            </Table>
                            <i className="arrow fas fa-chevron-right" onClick={nextMonth}></i>
                        </>}
                </div>
            </Col>
            <Col>
                <Events selectedDay={selectedDay} />
            </Col>
        </React.Fragment>
    );
};

export default Calendar;
