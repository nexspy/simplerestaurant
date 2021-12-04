import React, { useState, useEffect } from 'react';

const DateRangeOrder = ({ data, dateChanged }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
    }

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
    }

    useEffect(() => {
        dateChanged(startDate, endDate);
    }, [startDate, endDate]);

    return (
        <div className="filter-date-wrapper">
            <div className="filter-date-start">
                <label htmlFor="txt-start">Start Date</label>
                <input type="date" onChange={handleStartDateChange} value={startDate} id="txt-start"/>
            </div>
            <div className="filter-date-end">
                <label htmlFor="txt-end">End Date</label>
                <input type="date" onChange={handleEndDateChange} value={endDate} id="txt-end" />
            </div>
        </div>
    );
};

export default DateRangeOrder;