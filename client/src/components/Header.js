import React from 'react';

const Header = ({ year }) => {
    return (
        <div className="text-center m-5 d-flex justify-content-around align-items-center">
            <h1 className="font-weight-bold">eCalendar</h1>
            <h3>{year}</h3>
        </div>
    );
};

export default Header;
