import React, { useState } from 'react';

const Food = ({ data, foodSelected}) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (e) => {
    }

    const selectFood = () => {
        const temp = !isSelected;
        setIsSelected(temp);
        foodSelected(data, temp);
    }

    return (
        <div className="food box" onClick={selectFood}>
            <h3>{data.name} - <span>Rs.{data.price}</span></h3>
            <input type="checkbox" checked={isSelected} onChange={handleChange} />
        </div>
    )
}

export default Food;