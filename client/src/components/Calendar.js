import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import * as dateFns from "date-fns";

import Header from './Header';
import MonthPicker from './MonthPicker';

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

    const getDaysInMonth = () => {
        let rows = [];
        let days = [];
        let day = firstWeekOfMonthStart;

        while (day <= lastWeekOfMonthEnd) {
            for (let i = 1; i <= 7; i++) {
                days.push({ day });
                day = dateFns.addDays(day, 1);
            }
            rows.push(days);
            days = [];
        }

        return rows;
    };

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

    return (
        <React.Fragment>
            <Header year={year} />
            <MonthPicker month={month} prev={prevMonth} next={nextMonth} />
            <Table className="my-5">
                <thead className="text-center">
                    <tr>
                        {daysShort.map(day => {
                            return (
                                <td key={day}>{day.toUpperCase()}</td>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {getDaysInMonth().map(week => {
                        return (
                            <tr>
                                {week.map(d => {
                                    return (
                                        <td
                                            className={`text-center ${dateFns.isToday(d.day) && 'font-weight-bold text-danger'} ${dateFns.isBefore(d.day, selectedMonth) || dateFns.isAfter(d.day, endOfMonth) ? 'text-muted' : 'text-primary'}`}
                                            onClick={() => console.log(d.day)}>{dateFns.getDate(d.day)}
                                        </td>);
                                })}
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default Calendar;
