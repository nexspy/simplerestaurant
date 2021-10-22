import React, { useState } from 'react';

const FoodSearch = ({ handleSearchChange }) => {

    const minSearchLength = 0;
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length >= minSearchLength) {
            handleSearchChange(value);
        }
    };

    return (
        <div className="search-box">
            <input type="text" placeholder="search" value={search} onChange={handleSearch} />
        </div>
    )
};

export default FoodSearch;