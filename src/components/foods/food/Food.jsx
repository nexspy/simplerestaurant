import React, { useEffect, useState } from 'react';

const Food = ({ data, foodSelected}) => {
    const [isSelected, setIsSelected] = useState(data.isSelected);

    const handleChange = (e) => {
        var val = e.target.value;
    }

    const selectFood = () => {
        const temp = !isSelected;
        setIsSelected(temp);
        foodSelected(data, temp);
    }

    useEffect(() => {
        setIsSelected(data.isSelected);
    }, [data.isSelected]);

    return (
        <div className="food box" onClick={selectFood}>
            <h3>{data.name} - <span>Rs.{data.price}</span></h3>
            <input type="checkbox" checked={data.isSelected} onChange={handleChange} />
        </div>
    )
}

export default Food;