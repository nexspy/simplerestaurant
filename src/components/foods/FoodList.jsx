import React from 'react';

import Food from './food/Food.jsx'; 

const FoodList = ({ data }) => {

    const foodlist = data.map((item,key) => {
        return <Food data={item} key={key} />
    })
    return (
        <div className="food-list">
            {foodlist}
        </div>
    )
}

export default FoodList;