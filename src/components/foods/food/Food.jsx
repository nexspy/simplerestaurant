import React from 'react';

const Food = ({ data }) => {
    return (
        <div className="food">
            {data.name} - Rs.{data.price}
        </div>
    )
}

export default Food;