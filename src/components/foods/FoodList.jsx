import React from 'react';

import Food from './food/Food.jsx'; 

const FoodList = ({ data, foodSelected }) => {

    const foodlist = data.map((item,key) => {
        return <Food data={item} key={key} foodSelected={foodSelected} />
    })
    return (
        <div className="food-list boxes">
            {foodlist}
        </div>
    )
}

export default FoodList;