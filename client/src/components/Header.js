import React from 'react';

const Header = ({ year }) => {
    return (
        <div className="text-center mt-5 d-flex justify-content-around align-items-center text-dark">
            <h1 className="font-weight-bold">eCalendar</h1>
            <h3>{year}</h3>
        </div>
    );
};

export default Header;
